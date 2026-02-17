import fs from "fs";
import path from "path";
import matter from "gray-matter";

const root = process.cwd();

export async function getClubBySlug(slug: string) {
  // ファイルパスを特定
  const filePath = path.join(root, "content/club", `${slug}.mdx`);
  // 中身を読み込む
  const fileContent = fs.readFileSync(filePath, "utf8");
  // gray-matterで「メタデータ」と「本文」を分ける
  const { data, content } = matter(fileContent);

  return { meta: data, content };
}

export async function getAllClub() {
  const folderPath = path.join(root, "content/club");
  const files = fs.readdirSync(folderPath);

  return files
    .filter((file) => file.endsWith(".mdx")) // ← ここが重要！ .mdx ファイルだけを抽出
    .map((file) => {
      const fileContent = fs.readFileSync(path.join(folderPath, file), "utf8");
      const { data } = matter(fileContent);
      return { 
        slug: file.replace(".mdx", ""), 
        ...data 
      };
    });
}