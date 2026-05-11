# Quick Start Guide - The Miner Lab Theme

This is a 5-minute setup guide to get your theme deployed and live.

## Prerequisites
- Shopify store (any plan)
- GitHub account (for version control)
- Basic familiarity with Shopify admin

## 🚀 5-Minute Deployment

### Step 1: Push to GitHub (2 minutes)

```bash
# Navigate to theme directory
cd shopify-theme

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial Miner Lab theme"

# Set main branch
git branch -M main

# Add your GitHub remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/miner-lab-theme.git

# Push to GitHub
git push -u origin main
```

### Step 2: Connect to Shopify (2 minutes)

1. **Log into Shopify Admin**
   - Go to your store admin panel

2. **Navigate to Themes**
   - Click **Online Store** → **Themes**

3. **Connect GitHub**
   - Click **Add theme** button
   - Select **Connect from GitHub**
   - Authorize GitHub if prompted
   - Select your repository: `miner-lab-theme`
   - Select branch: `main`
   - Click **Connect**

4. **Wait for Deployment**
   - Shopify will automatically deploy the theme
   - Takes ~30 seconds

### Step 3: Activate Theme (1 minute)

1. **Preview Theme**
   - Click **Customize** on the new theme
   - Browse through pages to verify

2. **Publish**
   - Click **Publish** button in top right
   - Confirm publication
   - Theme is now live! 🎉

## 📝 Essential Setup (Optional - 15 minutes)

### Create Required Pages

1. **About Page**
   ```
   - Go to: Pages → Add page
   - Title: About
   - Template: page.about
   - Save
   ```

2. **Contact Page**
   ```
   - Go to: Pages → Add page
   - Title: Contact
   - Template: page.contact
   - Save
   ```

3. **FAQ Page**
   ```
   - Go to: Pages → Add page
   - Title: FAQ
   - Template: page.faq
   - Save
   ```

4. **Wholesale Page**
   ```
   - Go to: Pages → Add page
   - Title: Wholesale
   - Template: page.wholesale
   - Save
   ```

### Add Sample Product

```
Product Details:
- Title: Antminer S19 XP (140TH/s)
- Price: $9,999
- Tags: hashrate:140TH, efficiency:21.5 J/TH, algo:SHA-256, power:3010W, in-stock
- Description: Premium Bitcoin mining machine with industry-leading efficiency
- Upload at least 1 product image
```

**Important:** Tags MUST use the format `key:value` with NO spaces around the colon.

### Setup Navigation Menu

```
1. Go to: Navigation → Main menu
2. Add links:
   - Home → /
   - Products → /collections/all
   - About → /pages/about
   - FAQ → /pages/faq
   - Contact → /pages/contact
3. Save menu
```

## ✅ Verification Checklist

After deployment, verify these work:

- [ ] Homepage loads with hero section
- [ ] Header navigation displays
- [ ] Mobile menu opens/closes
- [ ] Product page shows specs from tags
- [ ] Add to cart button works
- [ ] Cart page is accessible
- [ ] Contact form loads
- [ ] FAQ accordions work

## 🎨 Customization

### Change Colors

```
1. Go to: Theme Customizer
2. Click: Theme Settings
3. Navigate to: Colors
4. Adjust as needed
5. Save changes
```

### Change Fonts

```
1. Go to: Theme Customizer
2. Click: Theme Settings
3. Navigate to: Typography
4. Select fonts from dropdown
5. Save changes
```

### Edit Homepage

```
1. Go to: Theme Customizer
2. Click sections to edit:
   - Hero section
   - Featured products
   - Reviews
   - Why Us
3. Save changes
```

## 🐛 Troubleshooting

**Theme not appearing after push?**
- Check that all files are in `shopify-theme/` directory
- Verify GitHub connection in Shopify
- Try disconnecting and reconnecting GitHub

**Product specs not showing?**
- Check tag format: `hashrate:140TH` (NO spaces)
- Verify tags are saved on product
- Clear cache and reload page

**Styles not loading?**
- Verify `assets/theme.css` exists
- Check browser console for errors
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

**JavaScript not working?**
- Verify `assets/theme.js` exists
- Check browser console for errors
- Ensure theme is published (not preview)

## 📚 Documentation

- **Full README:** See `README.md`
- **Deployment Guide:** See `DEPLOYMENT.md`
- **Shopify Docs:** https://shopify.dev/docs/themes

## 🆘 Need Help?

- **Theme Issues:** Check browser console for errors
- **Shopify Issues:** Visit Shopify Help Center
- **GitHub Issues:** Check repository issues tab

## 🎯 Next Steps

1. **Add More Products**
   - Create 5-10 products with proper tags
   - Upload high-quality images
   - Write detailed descriptions

2. **Setup Collections**
   - Create ASIC Miners collection
   - Create Accessories collection
   - Create Bundles collection

3. **Configure Settings**
   - Add social media links
   - Setup email newsletter
   - Configure checkout settings

4. **Test Everything**
   - Test on mobile devices
   - Test checkout process
   - Test contact form submission

5. **Launch Marketing**
   - Add Google Analytics
   - Setup Facebook Pixel
   - Create first email campaign

---

**Congratulations!** Your Miner Lab theme is now live! 🎉

For detailed information, see the full README.md and DEPLOYMENT.md files.
