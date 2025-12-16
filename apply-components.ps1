# PowerShell Script to Replace Headers and Footers with Component Placeholders
# This automates the component rollout across all HTML files

$rootPath = "c:\Users\Home\OneDrive\getting started\Documents\GitHub\anohubs-site\anohubs-site"

# Files to exclude
$excludeFiles = @(
    "components\header.html",
    "components\footer.html",
    "_header.html",
    "_footer.html"
)

# Header pattern to find (start of header tag)
$headerStartPattern = '<header class="fixed w-full z-50'

# Footer pattern to find (start of footer tag)
$footerStart = '<footer class="bg-black border-t'

# Get all HTML files recursively
$htmlFiles = Get-ChildItem -Path $rootPath -Filter "*.html" -Recurse -File | Where-Object {
    $relativePath = $_.FullName.Substring($rootPath.Length + 1)
    $exclude = $false
    foreach ($pattern in $excludeFiles) {
        if ($relativePath -like "*$pattern*") {
            $exclude = $true
            break
        }
    }
    -not $exclude
}

Write-Host "Found $($htmlFiles.Count) HTML files to process..."

$successCount = 0
$errorCount = 0

foreach ($file in $htmlFiles) {
    try {
        $content = Get-Content -Path $file.FullName -Raw
        $originalLength = $content.Length
        
        # Skip if already has global-header (already processed)
        if ($content -match 'id="global-header"') {
            Write-Host "SKIP: $($file.Name) - Already has component placeholders" -ForegroundColor Yellow
            continue
        }
        
        # Determine if this is a root file or subfolder file
        $relativePath = $file.FullName.Substring($rootPath.Length + 1)
        $inSubfolder = $relativePath.Contains("\")
        
        $scriptPath = if ($inSubfolder) {
            "../assets/js/layout-loader.js"
        } else {
            "assets/js/layout-loader.js"
        }
        
        # Replace header
        if ($content -match $headerStartPattern) {
            # Find the closing </header> tag
            $headerEndIndex = $content.IndexOf('</header>')
           
if ($headerEndIndex -gt 0) {
                $headerStartIndex = $content.IndexOf('<header class="fixed')
                $headerLength = ($headerEndIndex + 9) - $headerStartIndex  # 9 = length of '</header>'
                $headerSection = $content.Substring($headerStartIndex, $headerLength)
                
                # Replace with placeholder
                $content = $content.Replace($headerSection, '    <div id="global-header"></div>')
                Write-Host "  Replaced header in $($file.Name)" -ForegroundColor Green
            }
        }
        
        # Replace footer
        if ($content -match $footerStart) {
            # Find the closing </footer> tag
            $footerEndIndex = $content.IndexOf('</footer>')
            if ($footerEndIndex -gt 0) {
                $footerStartIndex = $content.IndexOf('<footer class="bg-black')
                $footerLength = ($footerEndIndex + 9) - $footerStartIndex  # 9 = length of '</footer>'
                $footerSection = $content.Substring($footerStartIndex, $footerLength)
                
                # Replace with placeholder
                $content = $content.Replace($footerSection, '    <div id="global-footer"></div>')
                Write-Host "  Replaced footer in $($file.Name)" -ForegroundColor Green
            }
        }
        
        # Add script reference before </body> if not already present
        if ($content -notmatch 'layout-loader.js') {
            $bodyEndIndex = $content.LastIndexOf('</body>')
            if ($bodyEndIndex -gt 0) {
                $scriptTag = "`r`n    <!-- Component Loader -->`r`n    <script src=`"$scriptPath`"></script>`r`n"
                $content = $content.Insert($bodyEndIndex, $scriptTag)
                Write-Host "  Added script reference to $($file.Name)" -ForegroundColor Green
            }
        }
        
        # Save the modified content
        Set-Content -Path $file.FullName -Value $content -NoNewline
        
        $newLength = $content.Length
        $saved = $originalLength - $newLength
        
        Write-Host "SUCCESS: $($file.Name) - Saved $saved bytes" -ForegroundColor Cyan
        $successCount++
        
    } catch {
        Write-Host "ERROR: $($file.Name) - $($_.Exception.Message)" -ForegroundColor Red
        $errorCount++
    }
}

Write-Host "`n=== SUMMARY ===" -ForegroundColor Magenta
Write-Host "Successfully processed: $successCount files" -ForegroundColor Green
Write-Host "Errors: $errorCount files" -ForegroundColor Red
Write-Host "Component rollout complete!" -ForegroundColor Cyan
