# Goal: Implement Visual-Driven Focused Parsing

This document outlines a plan to introduce a new feature that allows for more precise, user-driven parsing of specific sections within a document image. The core idea is to transform the user interface from a single content view into a multi-panel system that visualizes the document, its structure, and the resulting text, enabling a more accurate and interactive digitization workflow.

## Problem

The current implementation parses the entire document page at once. For historical documents with complex layouts, including multiple columns, articles, and advertisements, this can lead to inaccurate or poorly structured HTML output. There is no mechanism to isolate and parse a specific article or section of the page.

## Proposed Solution

I will modify the main content view within `app/content/[name]/page.tsx` to be a three-panel layout:

1.  **Original Image Panel:** This panel will display the high-resolution JPG image of the newspaper page, serving as a direct visual reference.

2.  **Interactive SVG Panel:** This panel will display an SVG file that overlays the original image. This SVG will contain clickable rectangular regions, each corresponding to a specific section of the document (e.g., a single article, a headline). This will be the primary tool for user interaction.

3.  **Parsed Content Panel:** This panel will display the HTML text extracted from the section selected by the user in the Interactive SVG Panel. This replaces the current behavior of showing the entire page's content.

This new interface will empower the user to guide the OCR process, dramatically improving the accuracy and granularity of the extracted text.

## Implementation Steps

I will implement this feature in a series of focused steps:

1.  **Restructure the Content Page:** I will modify `app/content/[name]/page.tsx` to replace the single `ParsedContent` component with a three-column flexbox layout. For now, the two new columns will contain simple placeholder text.

2.  **Display the Original Image:** The first column will be updated to display the `gazeta_xxx.jpg` image corresponding to the selected page.

3.  **Create and Display a Sample SVG:** I will manually create a sample `gazeta_001.svg` file containing a few `<rect>` elements that align with sections of the `gazeta_001.jpg` image. The second column will be updated to render this SVG.

4.  **Update JSON Structure:** The `gazeta_xxx.json` files will be updated to include paths to both the original image and the new SVG file, ensuring all related assets are linked.

5.  **Enable Focused Parsing:** The `parse.ts` script will be enhanced to accept optional coordinates (x, y, width, height). When coordinates are provided, it will crop the image before sending it to the model, thereby focusing the OCR on that specific region.

6.  **Implement Interactivity:** I will add JavaScript to the page to handle click events on the `<rect>` elements within the SVG. When a user clicks a rectangle, its coordinates will be captured.

7.  **Connect UI to Focused Parsing:** On-click, the application will trigger the updated parsing script, passing the coordinates of the selected SVG rectangle. The Parsed Content Panel will then be updated to display the newly extracted, section-specific text.
