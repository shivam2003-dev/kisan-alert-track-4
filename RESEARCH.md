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

## Claims Kept Conservative

- The hackathon app does not claim real disease-classifier accuracy.
- Satellite data is represented by realistic synthetic features until Earth Engine access and village boundaries are configured.
- The public site does not expose model or provider tokens.
- Production advice templates should be reviewed by RSK/KVK experts before pilot rollout.
