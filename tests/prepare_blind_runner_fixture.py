"""Original synthetic pixels only; no product media or human votes."""
from pathlib import Path
import importlib.util,struct,zlib,base64,sys
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('builder',ROOT/'skills/blind-test/scripts/build_study.py');builder=importlib.util.module_from_spec(spec);spec.loader.exec_module(builder)
def chunk(k,data):return struct.pack('>I',len(data))+k+data+struct.pack('>I',zlib.crc32(k+data))
def main(destination):
    png=b'\x89PNG\r\n\x1a\n'+chunk(b'IHDR',struct.pack('>IIBBBBB',1,1,8,2,0,0,0))+chunk(b'IDAT',zlib.compress(b'\x00\x40\x80\x40'))+chunk(b'IEND',b'')
    image='data:image/png;base64,'+base64.b64encode(png).decode()
    c={'study_id':'synthetic-pr38-review','protocol_version':2,'seed':20261114,'screens':['first','second','third'],'supported_locales':['en'],'supported_views':['desktop'],'qa_fixture':True,'capture_contract':{'dpr':1.0,'tiny':1e-7},'screen_labels':{'first':'</ScRiPt> literal label'},'artifacts':[{'id':x,'captures':{s+'/en/desktop':image for s in ['first','second','third']}} for x in ['a','b']]}
    builder.build(c,Path(destination)/'good');c['study_id']='synthetic-pr38-broken';c['artifacts'][0]['captures']={k:'data:image/png;base64,YmFk' for k in c['artifacts'][0]['captures']};builder.build(c,Path(destination)/'broken')
if __name__=='__main__':main(sys.argv[1])
