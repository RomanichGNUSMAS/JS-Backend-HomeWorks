-- 200 authors
INSERT INTO authors (name, birth_year, country)
SELECT
    'Author ' || gs,
    floor(random() * (2020 - 1940 + 1) + 1940)::int,
    (ARRAY[
        'Armenia',
        'Russia',
        'USA',
        'France',
        'Germany',
        'Italy',
        'Spain',
        'Japan',
        'China',
        'Canada'
    ])[floor(random() * 10 + 1)::int]
FROM generate_series(1, 200) gs;

-- 200 books
INSERT INTO books (
    title,
    author_id,
    price,
    in_stock,
    published_date,
    created_aT
)
SELECT
    'Book ' || gs,
    floor(random() * 200 + 1)::int,
    round((random() * 90 + 10)::numeric, 2),
    random() > 0.2,
    DATE '2000-01-01' + floor(random() * 9500)::int,
    NOW() - (random() * INTERVAL '365 days')
FROM generate_series(1, 200) gs;