---
title: PDF
date: 2022-11-24 15:24:10
cover: /images/pdf.jpg
thumbnail: /images/pdf.jpg
toc: true
categories:
- tech
tags:
- tech
- pdf
---

## Ref
1. [Introduction to PDF](https://web.archive.org/web/20141010035745/http://gnupdf.org/Introduction_to_PDF)
2. [Fillable PDF](https://www.adobe.com/acrobat/resources/how-to-create-fillable-pdf.html)

## Intro

- Portable Format Document
- A format meant to be displayed identicaly in all platforms and media

## Simple Example

- [Download](/doc/hello.pdf)

```
%PDF-1.7

1 0 obj  % entry point
<<
  /Type /Catalog
  /Pages 2 0 R
>>
endobj

2 0 obj
<<
  /Type /Pages
  /MediaBox [ 0 0 200 200 ]
  /Count 1
  /Kids [ 3 0 R ]
>>
endobj

3 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /Resources <<
    /Font <<
      /F1 4 0 R 
    >>
  >>
  /Contents 5 0 R
>>
endobj

4 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Times-Roman
>>
endobj

5 0 obj  % page content
<<
  /Length 44
>>
stream
BT
70 50 TD
/F1 12 Tf
(Hello, world!) Tj
ET
endstream
endobj

xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000079 00000 n 
0000000173 00000 n 
0000000301 00000 n 
0000000380 00000 n 
trailer
<<
  /Size 6
  /Root 1 0 R
>>
startxref
492
%%EOF
```

## Structure

Typically, a PDF contains 4 parts:

1. The header, with PDF version(and an option line to specify if the PDF contains binary data)

```
%PDF-1.7
```

2. The body, containing a series of objects

```
1 0 obj
...
endobj
2 0 obj
...
endobj
...
```

3. A cross-reference table that specifies the position of the bojects

```
xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000079 00000 n 
0000000173 00000 n 
0000000301 00000 n 
0000000380 00000 n
```

4. A trailer, with information about where the document starts

```
trailer
<<
  /Size 6
  /Root 1 0 R
>>
startxref
492
%%EOF
```

## Sign a PDF

- Signing can ensure a PDF has not been modified and to verify that the author is who we expect.
- For example, an important contract.


## Fill a PDF form

