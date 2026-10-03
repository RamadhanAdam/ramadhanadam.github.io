#!/usr/bin/env python3
import json
from pathlib import Path

def extract_frontmatter(content):
    """Extract YAML frontmatter between --- markers"""
    if content.startswith('---'):
        end = content.find('---', 3)
        if end != -1:
            frontmatter = content[3:end].strip()
            data = {}
            for line in frontmatter.split('\n'):
                if ':' in line:
                    key, val = line.split(':', 1)
                    key = key.strip()
                    val = val.strip()
                    if key == 'tags':
                        val = [
                            t.strip().strip('"').strip("'")
                            for t in val.strip('[]').split(',')
                            if t.strip()
                        ]
                    elif key == 'featured':
                        val = val.lower() == 'true'
                    else:
                        val = val.strip('"').strip("'")
                    data[key] = val
            return data, content[end+3:].strip()
    return {}, content

def main():
    articles_dir = Path('articles')
    output_file = articles_dir / 'index.json'

    # Build internal articles from .md files
    internal_articles = []
    for md_file in sorted(articles_dir.glob('*.md'), reverse=True):
        if md_file.name == 'index.json':
            continue
        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        frontmatter, _ = extract_frontmatter(content)
        
        article = {
            'file': md_file.name,
            'slug': md_file.stem,
            'title': frontmatter.get('title', md_file.stem.replace('-', ' ').title()),
            'date': frontmatter.get('date', ''),
            'category': frontmatter.get('category', ''),
            'tags': frontmatter.get('tags', []),
            'summary': frontmatter.get('summary', ''),
            'featured': frontmatter.get('featured', False),
            'external': False,
            'url': f'article.html?slug={md_file.stem}'
        }
        internal_articles.append(article)

    # Sort by date (newest first)
    internal_articles.sort(key=lambda x: x.get('date', ''), reverse=True)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(internal_articles, f, indent=2)
    
    print(f"Updated {output_file} with {len(internal_articles)} local articles")

if __name__ == '__main__':
    main()
