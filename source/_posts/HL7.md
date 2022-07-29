---
title: HL7
date: 2022-07-30 11:01:48
cover: /images/HL7.png
thumbnail: /images/HL7.png
categories:
- tech
- medical business
tags:
- tecj
- HL7
- medical business
---
## Ref
1. [Health Level 7](https://en.wikipedia.org/wiki/Health_Level_7)

## What and why
- HL7(Health Level 7) refers to a set of international standards for transfer of clinical and administrative data between software applications used by various healthcare providers.
- It focuses on application layer, which is 'layer 7' in [OSI model](https://en.wikipedia.org/wiki/OSI_model).
- Healthcare softwares need to talk with each other in the same language. HL7 tries to be that language.
<!--more-->
## HL7 components
|Name|Description|
|:-----:|:-----:|
|V2|Version 2.x Messaging Standard, an interoperability specification for health and medical transactions|
|V3|Version 3 Messaging Standard, an interoperability specification for health and medical transactions|
|CDA|Clinical Document Structure, an exchange model for clinical documents, based on HL7 Version 3|
|FHIR|Fast Healthcare Interoperability Resources, a standard for the exchange of resources|

Other components:
|Name|Description|
|:-----:|:-----:|
|CCD|Continuity of Care Document, a US specification for the exchange of medical summaries, based on CDA|
|SPL|Structured Product Labeling, the published information that accompanies a medicine, based on HL7 Version 3|
|CCOW|Clinical Context Object Workgroup, an interoperability specification for the visual integration of user applications|
|Arden Syntax|A grammar for representing medical conditions and recommendations as a Medical Logic Module (MLM)|
|Claims Attachments|A Standard Healthcare Attachment to augment another healthcare transaction|
|Functional Specification of EHR/PHR|A standardized description of health and medical functions sought for or available in such software applications|
|GELLO|A standard expression language used for clinical decision support|
