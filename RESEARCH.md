# Kisan Alert Research Notes

This project uses research and public-system evidence to avoid a generic crop-app design.

## Product Implications

1. Monsoon remote sensing should not depend only on optical imagery.
   - Product decision: use Sentinel-1 SAR wetness signals when clouds block Sentinel-2 NDVI/NDWI.
   - Demo implementation: synthetic Sentinel-style wetness board and crop-stress signal.

2. Dry-spell alerts must be crop-stage specific.
   - Product decision: simplify FAO-56 crop water need using `ETc = ETo * Kc`.
   - Demo implementation: sowing, vegetative and flowering stages change the risk framing and recommendation.

3. Advisory trust requires local validation and local language.
   - Product decision: make RSK/KVK validation part of the core workflow, not a later admin feature.
   - Demo implementation: low-confidence crop-health cases create RSK tickets with plot context.

4. Voice-first is the primary product, not a mobile-app add-on.
   - Product decision: IVR, missed call, SMS and WhatsApp voice are first-class channels.
   - Demo implementation: farmer form simulates the structured state behind an IVR call.

5. AI diagnosis must be confidence gated.
   - Product decision: high confidence can generate instant advice; low confidence goes to RSK.
   - Demo implementation: crop-health action creates a low-confidence ticket instead of overclaiming accuracy.

## Sources Checked

- FAO Irrigation and Drainage Paper 56: crop evapotranspiration and crop water requirement method.
  URL: https://www.fao.org/4/x0490e/x0490e00.htm
- Multimodal crop monitoring review: supports combining multiple remote-sensing data sources for crop monitoring.
  URL: https://www.sciencedirect.com/science/article/pii/S2352938523001751
- Sentinel-1 and Sentinel-2 crop mapping evidence: fusion of Sentinel-1 and Sentinel-2 can support early crop mapping.
  URL: https://pmc.ncbi.nlm.nih.gov/articles/PMC9783565/
- Satellite-based monitoring of monsoon crops in smallholder systems: assesses Sentinel-1 SAR and Sentinel-2 optical data for Indian monsoon crop monitoring.
  URL: https://drum.lib.umd.edu/items/c21291f3-7815-48b4-abd4-492d1397ac0b
- India agrometeorological advisory service impact study: estimates access and crop-yield impact from AAS in India.
  URL: https://journals.ametsoc.org/view/journals/wcas/15/4/WCAS-D-22-0130.1.xml
- AI4Bharat: open-source Indian language datasets, models and tools for ASR, translation and TTS.
  URL: https://ai4bharat.iitm.ac.in/
- Bhashini model availability: production-oriented Indic ASR, translation and TTS service model list.
  URL: https://dibd-bhashini.gitbook.io/bhashini-apis/available-models-for-usage
- East Africa SMS advisory experiments: six text-message agricultural extension programs across Kenya and Rwanda reached more than 128,000 farmers; effects can be modest but cost-effective when behavior-specific.
  URL: https://voxdev.org/topic/agriculture/harnessing-benefits-digital-agriculture-smallholder-farmers-east-africa
- J-PAL and Precision Development phone advisory case: phone-based agricultural information delivery scaled from randomized evaluation evidence.
  URL: https://www.povertyactionlab.org/case-study/phone-based-technology-agricultural-information-delivery
- Digital Green and Ethiopia video-mediated extension: randomized evidence on adding video into public agricultural extension.
  URL: https://www.povertyactionlab.org/evaluation/video-mediated-agricultural-extension-increase-technology-adoption-among-farmers
- PlantVillage Nuru cassava diagnosis evidence: scoped AI disease diagnosis can beat unaided human assessment in controlled disease/symptom settings, but is crop and context specific.
  URL: https://www.frontiersin.org/journals/plant-science/articles/10.3389/fpls.2020.590889/full
- Netafim precision irrigation principle: water and nutrients are applied at the right time, place and measured dose.
  URL: https://www.netafim.com/en/precision-irrigation/
- OECD Netherlands agriculture policy review: productivity, sustainability and resilience require an ecosystem and policy environment, not a standalone farm app.
  URL: https://www.oecd.org/content/dam/oecd/en/publications/reports/2023/06/policies-for-the-future-of-farming-and-food-in-the-netherlands_c632ba3d/bb16dea4-en.pdf
- UNDP smallholder precision agriculture report: farm-level data can support advisory, supply chains, policy planning and index insurance.
  URL: https://www.undp.org/sites/g/files/zskgke326/files/2021-10/UNDP-Precision-Agriculture-for-Smallholder-Farmers.pdf

## Global Lessons Converted Into Kisan Alert

| Global pattern | What it means | Kisan Alert adaptation |
| --- | --- | --- |
| Kenya and Rwanda SMS advisory | Phone channels scale cheaply, but advice must be specific enough to change behavior. | Missed-call IVR plus SMS fallback, with village, crop stage, rupee impact and two-signal alert gate. |
| Ethiopia video extension | Farmers trust demonstrations and local intermediaries more than abstract messages. | RSK-approved cases become local voice stories and reusable advisory templates. |
| PlantVillage Nuru | AI diagnosis is useful when the crop, disease set and image context are bounded. | AI gives triage buckets and confidence; uncertain or high-risk cases go to RSK. |
| Israel precision irrigation | Water efficiency comes from timing, placement and measured dose. | FAO-56-inspired stage guidance says delay sowing, protectively irrigate or delay urea rather than "rain/no rain." |
| Netherlands agri ecosystem | High performance comes from connected policy, research, logistics and feedback loops. | RSKs, FPOs, IMD, SHC, mandi data, insurance and district dashboards form one operating system. |
| India public stack | Existing public systems already hold weather, soil, market and helpline capabilities. | Kisan Alert does not replace them; it personalizes and closes the action loop around them. |

## Future Product Plan

1. Village climate twin:
   - Maintain each village's rainfall reliability, groundwater stress, crop history, RSK ticket patterns and crop-stage risk.
   - Use it to personalize recommendations even when plot data is sparse.

2. Advice receipt:
   - Every advisory stores the signals used, confidence, template version, RSK validator if any and callback status.
   - Farmers can replay it by missed call; officers can audit false alerts.

3. Risk wallet:
   - Convert dry-spell, seed-loss and irrigation risk into rupee terms.
   - Use the same ledger later for index-insurance evidence, FPO planning and credit risk reduction.

4. Community proof loop:
   - RSK-confirmed successful cases become local dialect stories, not generic tips.
   - The product should say, "Farmers in your village delayed sowing last week and avoided seed loss," when that is true.

5. Public-private operating model:
   - State agriculture department owns extension validation.
   - FPOs handle onboarding and farmer trust.
   - Weather, satellite and insurance partners consume anonymized risk events.
   - Input companies can subscribe to demand signals, but cannot override agronomic advice.

## Claims Kept Conservative

- The hackathon app does not claim real disease-classifier accuracy.
- Satellite data is represented by realistic synthetic features until Earth Engine access and village boundaries are configured.
- The public site does not expose model or provider tokens.
- Production advice templates should be reviewed by RSK/KVK experts before pilot rollout.
