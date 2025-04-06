const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Функция для форматирования времени (например, "1 час назад")
function formatTimeAgo(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(date)) / 1000);

    if (diffInSeconds < 60) {
        return `${diffInSeconds} секунд назад`;
    }
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} минут назад`;
    }
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} часов назад`;
    }
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
        return `${diffInDays} дней назад`;
    }
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
        return `${diffInWeeks} недель назад`;
    }
    return new Date(date).toLocaleDateString();
}

class PostsController {
    // Создать новую публикацию
    async createPost(req, res) {
        try {
            const { userId } = req.user;
            const { title, description, imageUrl, bedrooms, bathrooms, rooms, squareMeters, price, location } = req.body;

            if (!title || !description || !price || !location) {
                return res.status(400).json({ message: 'Title, description, price, and location are required' });
            }

            if (bedrooms && (isNaN(bedrooms) || bedrooms < 0)) {
                return res.status(400).json({ message: 'Bedrooms must be a non-negative number' });
            }
            if (bathrooms && (isNaN(bathrooms) || bathrooms < 0)) {
                return res.status(400).json({ message: 'Bathrooms must be a non-negative number' });
            }
            if (rooms && (isNaN(rooms) || rooms < 0)) {
                return res.status(400).json({ message: 'Rooms must be a non-negative number' });
            }
            if (squareMeters && (isNaN(squareMeters) || squareMeters <= 0)) {
                return res.status(400).json({ message: 'Square meters must be a positive number' });
            }
            if (isNaN(price) || price <= 0) {
                return res.status(400).json({ message: 'Price must be a positive number' });
            }

            const post = await prisma.post.create({
                data: {
                    title,
                    description,
                    imageUrl: imageUrl || undefined,
                    bedrooms: bedrooms ? parseInt(bedrooms) : undefined,
                    bathrooms: bathrooms ? parseInt(bathrooms) : undefined,
                    rooms: rooms ? parseInt(rooms) : undefined,
                    squareMeters: squareMeters ? parseFloat(squareMeters) : undefined,
                    price: parseFloat(price),
                    location,
                    authorId: userId
                },
                include: {
                    author: {
                        select: { id: true, username: true, profilePicture: true }
                    }
                }
            });

            post.timeAgo = formatTimeAgo(post.createdAt);
            res.status(201).json(post);
        } catch (error) {
            console.error('Error in createPost:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    // Получить ленту событий с фильтрацией и пагинацией
    async getFeed(req, res) {
        try {
            const { userId } = req.user;

            // Параметры пагинации
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 20;
            const skip = (page - 1) * pageSize;

            // Фильтры из query-параметров
            const {
                minPrice,
                maxPrice,
                location,
                bedrooms,
                bathrooms,
                rooms,
                minSquareMeters,
                maxSquareMeters,
                visibility
            } = req.query;

            // Формируем условия фильтрации
            const whereClause = {};

            // Фильтр по видимости (all, friends, me)
            if (visibility === 'me') {
                whereClause.authorId = userId;
            } else if (visibility === 'friends') {
                const friends = await prisma.friendship.findMany({
                    where: {
                        OR: [
                            { userId, status: "accepted" },
                            { friendId: userId, status: "accepted" }
                        ]
                    }
                });
                const friendIds = friends.map(f => (f.userId === userId ? f.friendId : f.userId));
                const relevantUserIds = [userId, ...friendIds];
                whereClause.authorId = { in: relevantUserIds };
            }

            // Фильтр по цене
            if (minPrice || maxPrice) {
                whereClause.price = {};
                if (minPrice) {
                    whereClause.price.gte = parseFloat(minPrice);
                }
                if (maxPrice) {
                    whereClause.price.lte = parseFloat(maxPrice);
                }
            }

            // Фильтр по местоположению
            if (location) {
                whereClause.location = {
                    contains: location,
                    mode: 'insensitive'
                };
            }

            // Фильтр по количеству спален
            if (bedrooms) {
                whereClause.bedrooms = parseInt(bedrooms);
            }

            // Фильтр по количеству ванных комнат
            if (bathrooms) {
                whereClause.bathrooms = parseInt(bathrooms);
            }

            // Фильтр по количеству комнат
            if (rooms) {
                whereClause.rooms = parseInt(rooms);
            }

            // Фильтр по площади
            if (minSquareMeters || maxSquareMeters) {
                whereClause.squareMeters = {};
                if (minSquareMeters) {
                    whereClause.squareMeters.gte = parseFloat(minSquareMeters);
                }
                if (maxSquareMeters) {
                    whereClause.squareMeters.lte = parseFloat(maxSquareMeters);
                }
            }

            // Получаем общее количество постов (для пагинации)
            const totalPosts = await prisma.post.count({
                where: whereClause
            });

            // Получаем посты с учётом фильтров и пагинации
            const posts = await prisma.post.findMany({
                where: whereClause,
                include: {
                    author: {
                        select: { id: true, username: true, profilePicture: true }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                },
                skip: skip,
                take: pageSize
            });

            // Форматируем дату для каждого поста
            const formattedPosts = posts.map(post => ({
                ...post,
                timeAgo: formatTimeAgo(post.createdAt)
            }));

            // Формируем ответ с пагинацией
            const response = {
                posts: formattedPosts,
                pagination: {
                    currentPage: page,
                    pageSize: pageSize,
                    totalPosts: totalPosts,
                    totalPages: Math.ceil(totalPosts / pageSize),
                    hasNextPage: skip + posts.length < totalPosts,
                    hasPreviousPage: page > 1
                }
            };

            res.json(response);
        } catch (error) {
            console.error('Error in getFeed:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }

    // Поиск публикаций с фильтрацией и пагинацией
    async searchPosts(req, res) {
        try {
            const { userId } = req.user;

            // Параметры пагинации
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 20;
            const skip = (page - 1) * pageSize;

            // Фильтры из query-параметров
            const {
                query, // Поисковый запрос (для title и description)
                minPrice,
                maxPrice,
                location,
                bedrooms,
                bathrooms,
                rooms,
                minSquareMeters,
                maxSquareMeters,
                visibility
            } = req.query;

            // Формируем условия фильтрации
            const whereClause = {};

            // Фильтр по видимости (all, friends, me)
            if (visibility === 'me') {
                whereClause.authorId = userId;
            } else if (visibility === 'friends') {
                const friends = await prisma.friendship.findMany({
                    where: {
                        OR: [
                            { userId, status: "accepted" },
                            { friendId: userId, status: "accepted" }
                        ]
                    }
                });
                const friendIds = friends.map(f => (f.userId === userId ? f.friendId : f.userId));
                const relevantUserIds = [userId, ...friendIds];
                whereClause.authorId = { in: relevantUserIds };
            }

            // Поиск по заголовку и описанию
            if (query) {
                whereClause.OR = [
                    { title: { contains: query, mode: 'insensitive' } },
                    { description: { contains: query, mode: 'insensitive' } }
                ];
            }

            // Фильтр по местоположению
            if (location) {
                whereClause.location = {
                    contains: location,
                    mode: 'insensitive'
                };
            }

            // Фильтр по цене
            if (minPrice || maxPrice) {
                whereClause.price = {};
                if (minPrice) {
                    whereClause.price.gte = parseFloat(minPrice);
                }
                if (maxPrice) {
                    whereClause.price.lte = parseFloat(maxPrice);
                }
            }

            // Фильтр по количеству спален
            if (bedrooms) {
                whereClause.bedrooms = parseInt(bedrooms);
            }

            // Фильтр по количеству ванных комнат
            if (bathrooms) {
                whereClause.bathrooms = parseInt(bathrooms);
            }

            // Фильтр по количеству комнат
            if (rooms) {
                whereClause.rooms = parseInt(rooms);
            }

            // Фильтр по площади
            if (minSquareMeters || maxSquareMeters) {
                whereClause.squareMeters = {};
                if (minSquareMeters) {
                    whereClause.squareMeters.gte = parseFloat(minSquareMeters);
                }
                if (maxSquareMeters) {
                    whereClause.squareMeters.lte = parseFloat(maxSquareMeters);
                }
            }

            // Получаем общее количество постов (для пагинации)
            const totalPosts = await prisma.post.count({
                where: whereClause
            });

            // Получаем посты с учётом фильтров и пагинации
            const posts = await prisma.post.findMany({
                where: whereClause,
                include: {
                    author: {
                        select: { id: true, username: true, profilePicture: true }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                },
                skip: skip,
                take: pageSize
            });

            // Форматируем дату для каждого поста
            const formattedPosts = posts.map(post => ({
                ...post,
                timeAgo: formatTimeAgo(post.createdAt)
            }));

            // Формируем ответ с пагинацией
            const response = {
                posts: formattedPosts,
                pagination: {
                    currentPage: page,
                    pageSize: pageSize,
                    totalPosts: totalPosts,
                    totalPages: Math.ceil(totalPosts / pageSize),
                    hasNextPage: skip + posts.length < totalPosts,
                    hasPreviousPage: page > 1
                }
            };

            res.json(response);
        } catch (error) {
            console.error('Error in searchPosts:', error);
            res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = new PostsController();