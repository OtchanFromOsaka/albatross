-- ユーザーテーブルの作成
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    display_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    created_at INTEGER NOT NULL DEFAULT (unixepoch()),
    updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);

-- インデックスの作成
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at DESC);

-- テスト用ダミーデータ（開発環境用）
INSERT OR IGNORE INTO users (
    id,
    username,
    email,
    password_hash,
    display_name,
    bio
) VALUES
    ('550e8400-e29b-41d4-a716-446655440101', 'user001', 'user001@example.com', '$2b$10$dummy.hash.for.development.only', 'テストユーザー1', 'これはテスト用のユーザーです。'),
    ('550e8400-e29b-41d4-a716-446655440102', 'user002', 'user002@example.com', '$2b$10$dummy.hash.for.development.only', 'テストユーザー2', '画像投稿が趣味です。'),
    ('550e8400-e29b-41d4-a716-446655440103', 'user003', 'user003@example.com', '$2b$10$dummy.hash.for.development.only', 'テストユーザー3', 'よろしくお願いします！');
