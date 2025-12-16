# How to Add New Insights Articles

This document explains how to add a new article to the Insights page without editing any HTML or JavaScript code.

## Quick Start

To add a new article, simply edit the file:
```
assets/js/insights-data.json
```

Add a new object to the array with the following structure:

```json
{
    "id": 18,
    "tag": "YOUR TAG",
    "category": "tech",
    "title": "Your Article Title",
    "description": "A brief description of your article",
    "date": "2025-12-16",
    "link": "article-18-your-slug.html",
    "readTime": "5 MIN",
    "image": "../assets/images/your-image.jpg"
}
```

## Field Explanations

- **id**: Unique number (use next available number)
- **tag**: Uppercase badge label (e.g., "TECHNICAL", "STRATEGY", "MANIFESTO")
- **category**: Filter category - must be one of:
  - `"tech"` - Technical articles
  - `"finance"` - Financial/business articles  
  - `"strategy"` - Strategic insights
- **title**: Article headline
- **description**: Short summary (1-2 sentences)
- **date**: Publication date in `YYYY-MM-DD` format
- **link**: Filename of the article HTML file (relative to insights/ folder)
- **readTime**: Estimated reading time (e.g., "5 MIN", "10 MIN")
- **image**: (Optional) Background image for featured articles

## Important Notes

### Featured Article
- Article with `id: 17` (The Manifesto) is always featured at the top
- If you want to change the featured article, give your new article `id: 17` and change the old one

### Image Field
- Only needed if the article will be featured
- Path should be relative to the insights/ folder
- Example: `"../assets/images/Article 18/background.jpg"`

### Date Format
- Use `YYYY-MM-DD` format (e.g., "2025-12-16")
- This ensures proper sorting and display

## Example: Adding Article #18

1. Open `assets/js/insights-data.json`
2. Add this to the array (at the top, after the opening `[`):

```json
{
    "id": 18,
    "tag": "INNOVATION",
    "category": "tech",
    "title": "Breakthrough in Turbine Efficiency",
    "description": "How new materials science is revolutionizing hydro turbine performance and longevity.",
    "date": "2025-12-16",
    "link": "article-18-turbine-efficiency.html",
    "readTime": "6 MIN"
},
```

3. **Don't forget the comma** after the closing `}` (except for the last item)
4. Save the file
5. Create your article HTML file in the `insights/` folder
6. Refresh the page - your article will appear!

## File Organization

```
anohubs-site/
├── assets/
│   └── js/
│       └── insights-data.json  ← Edit this file to add articles
├── insights/
│   ├── expert-insights.html    ← Main insights page (don't edit)
│   ├── article-1-*.html        ← Your article files
│   ├── article-2-*.html
│   └── ...
```

## Testing

After adding a new article:

1. Open your local server
2. Navigate to the Insights page
3. Verify your article appears
4. Test filtering by category
5. Test search functionality
6. Check that the article link works

## Common Mistakes

❌ **Missing comma** between objects
```json
{
    "id": 18,
    ...
}  // ← Missing comma!
{
    "id": 17,
    ...
}
```

✅ **Correct:**
```json
{
    "id": 18,
    ...
},  // ← Comma here!
{
    "id": 17,
    ...
}
```

❌ **Wrong category** name
```json
"category": "technical"  // Wrong! Use "tech"
```

✅ **Correct:**
```json
"category": "tech"  // One of: tech, finance, strategy
```

## Need Help?

If the page doesn't load:
1. Check browser console for errors (F12)
2. Verify JSON syntax is correct (use a JSON validator)
3. Ensure commas are in the right places
4. Check file path is correct

That's it! No code editing required. 🎉
