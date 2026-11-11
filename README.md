# kristinalifors.se – static rebuild of kristinalifors.eu

A plain HTML/CSS/JS site: no CMS, no database, no build step. Upload the folder contents to any web host.

## Pages (same addresses as the old site)
/  ·  /about  ·  /services  ·  /portfolio  ·  /contact  ·  /project/<name> (12 projects)

## Images – do this first
The pages look for images in `images/`. Until those files exist, each image falls back to
its address on kristinalifors.eu, so the site only works while the old site is still online.

To copy all 171 images into this folder, run one of these from the site folder:

    Windows:    powershell -ExecutionPolicy Bypass -File download-images.ps1
    Mac/Linux:  bash download-images.sh

`images/manifest.csv` lists every file and where it comes from. The gallery images are the
1000 px versions the old site serves; if you can get the original uploads from the old CMS
(Bolt keeps them under `/files/`), drop them in under the same names for sharper results.

## Before going live
1. Run the image download and check the count it prints (171).
2. Contact form: it currently opens the visitor's e-mail program with the message filled in.
   For a form that sends by itself, point it at your host's form handler or a form service
   (see the comment at the bottom of `assets/site.js`).
3. Upload everything to the kristinalifors.se web root. The host must serve `index.html` for
   folder addresses (every normal host does). `404.html` is the not-found page.
4. Put `old-domain.htaccess` (renamed `.htaccess`) on the kristinalifors.eu hosting so old
   links redirect to the new domain. Do not upload it to the new site.
5. Add kristinalifors.se in Google Search Console, submit `sitemap.xml`, and use
   "Change of address" from the .eu property.

## Previewing on your computer
Double-click `index.html`, or run `python -m http.server` in this folder and open http://localhost:8000
