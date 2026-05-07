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
                        val = [t.strip() for t in val.strip('[]').split(',')]
                    data[key] = val
            return data, content[end+3:].strip()
    return {}, content

def main():
    articles_dir = Path('articles')
    output_file = articles_dir / 'index.json'
    
    # Load existing index.json to preserve external articles
    external_articles = []
    if output_file.exists():
        with open(output_file, 'r', encoding='utf-8') as f:
            existing = json.load(f)
            # Keep only entries that are explicitly external OR have no matching .md file
            # We'll re-add internal ones from scratch, so just preserve external ones
            for entry in existing:
                if entry.get('external') is True:
                    external_articles.append(entry)
    
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
            'tags': frontmatter.get('tags', []),
            'external': False,
            'url': f'article.html?slug={md_file.stem}'
        }
        internal_articles.append(article)
    
    # Merge: external first, then internal (or sort by date)
    all_articles = external_articles + internal_articles
    
    # Sort by date (newest first)
    all_articles.sort(key=lambda x: x.get('date', ''), reverse=True)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_articles, f, indent=2)
    
    print(f"Updated {output_file} with {len(internal_articles)} internal + {len(external_articles)} external = {len(all_articles)} total")

if __name__ == '__main__':
    main()