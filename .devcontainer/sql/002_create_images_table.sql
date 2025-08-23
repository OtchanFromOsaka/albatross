-- 画像テーブルの作成
CREATE TABLE IF NOT EXISTS images (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    filename TEXT NOT NULL,
    r2_key TEXT NOT NULL,        -- R2での保存パス
    mime_type TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    height INTEGER NOT NULL,     -- フロントエンド用
    width INTEGER NOT NULL,      -- フロントエンド用
    created_at INTEGER NOT NULL DEFAULT (unixepoch()),
    updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);

-- インデックスの作成
CREATE INDEX IF NOT EXISTS idx_images_user_id ON images(user_id);
CREATE INDEX IF NOT EXISTS idx_images_created_at ON images(created_at DESC);

-- テスト用ダミーデータ（開発環境用）
INSERT OR IGNORE INTO images (
    id,
    user_id,
    filename,
    r2_key,
    mime_type,
    file_size,
    height,
    width
) VALUES
    ('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440101', 'sample1.jpg', 'images/2025/08/550e8400-e29b-41d4-a716-446655440001.jpg', 'image/jpeg', 245760, 400, 600),
    ('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440101', 'sample2.png', 'images/2025/08/550e8400-e29b-41d4-a716-446655440002.png', 'image/png', 189440, 300, 400),
    ('550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440102', 'sample3.jpg', 'images/2025/08/550e8400-e29b-41d4-a716-446655440003.jpg', 'image/jpeg', 367820, 500, 350);
