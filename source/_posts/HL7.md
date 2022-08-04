---
title: HL7
date: 2022-07-30 11:01:48
cover: /images/HL7.png
thumbnail: /images/HL7.png
categories:
- HIT
tags:
- tecj
- HL7
- HIT
- underwork
---
**(THIS BLOG IS STILL IN PROGRESS)**
## Ref
1. [Health Level 7](https://en.wikipedia.org/wiki/Health_Level_7)
2. [Here's What You Should Know about HL7 Messages and its Types](https://www.covetus.com/blog/heres-what-you-should-know-about-hl7-messages-and-its-types)
3. [Overview of OIDs used in European HL7 artefacts](http://ringholm.com/docs/00900_en.htm)

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

## HL7 V2
### Intro
- Originally created in 1989, quite a few years from now. Now its got versions 2.1, 2.2, 2.3, 2.3.1, 2.4, 2.5, 2.5.1, 2.6, 2.7, 2.7.1, 2.8, 2.8.1 and 2.8.2. V2 standards are backward compatible.
- Read complete specification [here](http://www.hl7.eu/HL7v2x/v282/std282/hl7.html)(based on 2.8.2)

### Message types and trigger events
Message type and trigger event are interchangable in most cases.

A trigger event is a real-world event that initiates communication and the sending of a message. 

`MSH-9`(9th field of the `MSH` segment) contains message type and trigger event. Message type and trigger event together specifies the type of a HL7 v2 message. For example, `ADT-A01` is a typical `MSH-9` segment value, `ADT`(`ADT` means Admit, Discharge, Transfer) is the message type and `A01` is the trigger event(`A01` means admitted, while `A02` means transferred and `A03` means discharged).

See full list of message type/trigger event [here](https://hl7-definition.caristix.com/v2/HL7v2.5.1/TriggerEvents)(based on v2.5.1).

### Message Structure
- **Message**
- => **Segment**: Each line is a segment, a carriage return `\r` separates one from another. 
- ===> **Field/Composite**: A pipe `|` separates one from another. Fields may contain sub-fields separated by caret `^`.

Example:
```
MSH|^~\&|MegaReg|XYZHospC|SuperOE|XYZImgCtr|20060529090131-0500||ADT^A01^ADT_A01|01052901|P|2.5
EVN||200605290901||||
PID|||56782445^^^UAReg^PI||KLEINSAMPLE^BARRY^Q^JR||19620910|M||2028-9^^HL70005^RA99113^^XYZ|260 GOODWIN CREST DRIVE^^BIRMINGHAM^AL^35209^^M~NICKELL’S PICKLES^10000 W 100TH AVE^BIRMINGHAM^AL^35200^^O|||||||0105I30001^^^99DEF^AN
PV1||I|W^389^1^UABH^^^^3||||12345^MORGAN^REX^J^^^MD^0010^UAMC^L||67890^GRAINGER^LUCY^X^^^MD^0010^UAMC^L|MED|||||A0||13579^POTTER^SHERMAN^T^^^MD^0010^UAMC^L|||||||||||||||||||||||||||200605290900
OBX|1|NM|^Body Height||1.80|m^Meter^ISO+|||||F
OBX|2|NM|^Body Weight||79|kg^Kilogram^ISO+|||||F
AL1|1||^ASPIRIN
DG1|1||786.50^CHEST PAIN, UNSPECIFIED^I9|||A
```
> A great search table for HL7 v2 components: [Caristix](https://hl7-definition.caristix.com/v2/) (Search box at top right)
For example, search `ADT_A01`(trigger event), `MSH`(segment), `MSH.9`(Field).

### OID
HL7 Version 3 artefacts use OIDs (unique Object IDentifiers, an ISO standard) to identify coding schemes and identifier namespaces.
See OID Registry table [here](https://www.hl7.org/oid/)