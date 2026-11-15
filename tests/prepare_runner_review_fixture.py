"""Original synthetic fixtures for PR50's protocol/locale review. Never human votes."""
from pathlib import Path
import base64, importlib.util, sys, tempfile

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('builder', ROOT / 'skills/blind-test/scripts/build_study.py')
builder = importlib.util.module_from_spec(spec)
spec.loader.exec_module(builder)


def main(destination):
    # Use the already-tested original PNG generator, rather than a product capture.
    spec = importlib.util.spec_from_file_location('pixels', ROOT / 'tests/prepare_blind_runner_fixture.py')
    pixels = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(pixels)
    import struct, zlib
    png = b'\x89PNG\r\n\x1a\n' + pixels.chunk(b'IHDR', struct.pack('>IIBBBBB', 1, 1, 8, 2, 0, 0, 0)) + pixels.chunk(b'IDAT', zlib.compress(b'\x00\x40\x80\x40')) + pixels.chunk(b'IEND', b'')
    capture = 'data:image/png;base64,' + base64.b64encode(png).decode()
    config = {'schema_version': 2, 'protocol_version': 3, 'seed': 20261115, 'qa_fixture': True,
              'comparison': {'format': 'round_robin', 'side_control': 'seeded'},
              'supported_locales': ['en'], 'supported_views': ['desktop'],
              'screens': ['one', 'two', 'three', 'four', 'five'], 'evaluation_unit': 'multi_surface',
              'artifacts': [{'id': 'v'+str(i), 'captures': {s+'/en/desktop': capture for s in ['one', 'two', 'three', 'four', 'five']}} for i in range(7)]}
    for coherence in [True, False]:
        builder.build({**config, 'study_id': 'synthetic-review-multi-'+str(coherence).lower(), 'coherence': coherence}, Path(destination)/('multi' if coherence else 'multi-no-set'))
    single = {**config, 'study_id': 'synthetic-review-surface', 'screens': ['one'], 'evaluation_unit': 'surface'}
    builder.build(single, Path(destination)/'surface')
    with tempfile.TemporaryDirectory() as tmp:
        source = Path(tmp)
        for identifier in ['a', 'b']:
            site = source/identifier
            site.mkdir()
            for locale, title in [('en', 'Repair atlas'), ('ru', 'Атлас ремонта')]:
                (site/(locale+'.html')).write_text(f'<!doctype html><html lang="{locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{title}</title></head><body><h1>{title}</h1><a href="{locale}.html?route=detail&amp;source=https://example.invalid">{title} detail</a><p>Original synthetic QA material · {identifier}</p></body></html>', encoding='utf8')
        whole = {**config, 'study_id': 'synthetic-review-locales', 'evaluation_unit': 'whole_site',
                 'screens': ['home'], 'supported_locales': ['en', 'ru'], 'supported_views': ['desktop', 'mobile'],
                 'artifacts': [{'id': x, 'site_dir': x, 'site_entry': 'en.html', 'site_entries': {'en': 'en.html', 'ru': 'ru.html'}} for x in ['a', 'b']]}
        builder.build(whole, Path(destination)/'locales', source)


if __name__ == '__main__':
    main(sys.argv[1])
