#!/usr/bin/env python3
import json
import os
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
                        # Handle [tag1, tag2] format
                        val = [t.strip() for t in val.strip('[]').split(',')]
                    data[key] = val
            return data, content[end+3:].strip()
    return {}, content

def main():
    articles_dir = Path('articles')
    output_file = articles_dir / 'index.json'
    
    articles = []
    
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
            'tags': frontmatter.get('tags', []),
            'external': False,
            'url': f'article.html?slug={md_file.stem}'
        }
        articles.append(article)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(articles, f, indent=2)
    
    print(f"Updated {output_file} with {len(articles)} articles")

if __name__ == '__main__':
    main()