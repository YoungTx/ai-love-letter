-- 用户生成的情书记录
CREATE TABLE love_letters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  content TEXT NOT NULL,
  prompt TEXT NOT NULL,
  locale VARCHAR(10) NOT NULL,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 收藏表
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  letter_id UUID REFERENCES love_letters(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, letter_id)
);

-- 添加 RLS 策略
ALTER TABLE love_letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- love_letters 的 RLS 策略
CREATE POLICY "可以查看公开的情书"
  ON love_letters FOR SELECT
  USING (is_public OR auth.uid() = user_id);

CREATE POLICY "用户可以创建自己的情书"
  ON love_letters FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "用户可以更新自己的情书"
  ON love_letters FOR UPDATE
  USING (auth.uid() = user_id);

-- favorites 的 RLS 策略
CREATE POLICY "用户可以查看自己的收藏"
  ON favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "用户可以添加收藏"
  ON favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "用户可以删除自己的收藏"
  ON favorites FOR DELETE
  USING (auth.uid() = user_id);

-- 在现有代码前添加用户表
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  provider TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 添加 RLS 策略
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- users 的 RLS 策略
CREATE POLICY "用户可以查看自己的信息"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "用户可以更新自己的信息"
  ON users FOR UPDATE
  USING (auth.uid() = id); 