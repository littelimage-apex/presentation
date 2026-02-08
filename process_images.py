import json
import os
import re
import urllib.request
from urllib.parse import urlparse

# Configuration
input_file = r"C:/Users/josef/.gemini/antigravity/brain/7b939b6a-4715-45e6-a65e-a9ddbcb5e286/.system_generated/steps/9/output.txt"
output_dir = r"c:/Users/josef/Documents/presntion/presentation/assets/images"
content_file = r"c:/Users/josef/Documents/presntion/presentation/current_website_content_with_images.md"

# Ensure output directory exists
os.makedirs(output_dir, exist_ok=True)

def get_category_from_url(url):
    try:
        path = urlparse(url).path
        if "Newborn" in path: return "newborn"
        if "Threeyearmilstone" in path: return "three_year_milestone"
        if "child" in path: return "child"
        if "newborn-copy" in path: return "special_occasion"
        if "Onlocation" in path: return "outdoor"
        if "events" in path: return "events"
        if "new-page-1" in path: return "pricing" # Pricing
        if "new-page" in path: return "about"   # About
        if "contact" in path: return "contact"
        if path == "/" or path == "": return "home"
        return "misc"
    except:
        return "misc"

def download_image(url, category):
    try:
        # Create category directory
        cat_dir = os.path.join(output_dir, category)
        os.makedirs(cat_dir, exist_ok=True)
        
        # Extract filename
        path = urlparse(url).path
        filename = os.path.basename(path)
        if not filename: return None
        # Sanitize filename
        filename = re.sub(r'[^\w\-.]', '_', filename)
        if len(filename) > 50: filename = filename[-50:] # Truncate if too long
        
        filepath = os.path.join(cat_dir, filename)
        
        # Check if file exists
        if os.path.exists(filepath):
            return filepath
            
        print(f"Downloading {url} to {filepath}...")
        
        # Add headers to mimic a browser to avoid 403s
        opener = urllib.request.build_opener()
        opener.addheaders = [('User-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36')]
        urllib.request.install_opener(opener)
        
        urllib.request.urlretrieve(url, filepath)
        return filepath
    except Exception as e:
        print(f"Error downloading {url}: {e}")
        return None

def process_crawl_data():
    if not os.path.exists(input_file):
        print(f"Error: Input file {input_file} not found.")
        return

    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except json.JSONDecodeError as e:
        print(f"JSON Decode Error: {e}")
        return
    except Exception as e:
        print(f"Error reading file: {e}")
        return
    
    markdown_output = "# Website Content & Image Library\n\n"
    
    # Check if 'data' key exists, if not, maybe it's a list directly or different structure
    items = data.get('data', []) if isinstance(data, dict) else data
    
    for page in items:
        # Handle cases where metadata might be missing
        url = page.get('metadata', {}).get('url', 'unknown')
        category = get_category_from_url(url)
        markdown_content = page.get('markdown', '')
        
        markdown_output += f"## Gallery: {category.title()} ({url})\n\n"
        
        # Find all images in the markdown
        images = re.findall(r'!\[(.*?)\]\((.*?)\)', markdown_content)
        
        if not images:
            markdown_output += "*No images found on this page.*\n\n"
            continue
            
        markdown_output += f"### Images\n\n"
        
        count = 0
        for alt, img_url in images:
            # Skip verify stats or layout images if possible - simplistic filtering
            if "challenges.cloudflare.com" in img_url: continue
            
            # Download image
            local_path = download_image(img_url, category)
            
            if local_path:
                # Make path relative for the markdown file
                # We need to calculate relative path from the markdown file location to the image
                # content_file is in presntion/
                # images are in presntion/assets/images/category/
                
                # relative path should be assets/images/category/filename
                filename = os.path.basename(local_path)
                rel_path = f"assets/images/{category}/{filename}"
                
                markdown_output += f"- ![{alt}]({rel_path})\n"
                count += 1
                if count >= 30: # Limit images per category
                    markdown_output += f"- *(... and {len(images) - 30} more images)*\n"
                    break
        
        markdown_output += "\n---\n\n"
        
    with open(content_file, 'w', encoding='utf-8') as f:
        f.write(markdown_output)
    
    print(f"Finished processing. Content saved to {content_file}", flush=True)

if __name__ == "__main__":
    print("Script started!", flush=True)
    process_crawl_data()
