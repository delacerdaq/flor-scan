"""Gera ilustrações SVG locais para o catálogo acadêmico FlorScan.
Não requer bibliotecas externas e não acessa a internet.
"""
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1] / 'public' / 'assets'
ROOT.mkdir(parents=True, exist_ok=True)

def svg(inner, bg='#F9F0EE', circle='#FFE1E3'):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 520" role="img">
<defs><linearGradient id="pot" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#D99270"/><stop offset="1" stop-color="#AB5E45"/></linearGradient><linearGradient id="leaf" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#9EAD4A"/><stop offset="1" stop-color="#42683D"/></linearGradient></defs>
<rect width="500" height="520" rx="40" fill="{bg}"/><circle cx="259" cy="242" r="184" fill="{circle}" opacity=".8"/>
<circle cx="79" cy="126" r="13" fill="#fff" opacity=".75"/><circle cx="414" cy="355" r="18" fill="#fff" opacity=".5"/>
<ellipse cx="250" cy="462" rx="122" ry="17" fill="#3A413B" opacity=".10"/>
{inner}
</svg>'''

def pot():
    return '''<path d="M166 363h168l-17 92q-4 23-29 23h-77q-25 0-29-23z" fill="url(#pot)"/>
    <rect x="158" y="352" width="184" height="29" rx="9" fill="#C97C61"/>
    <path d="M193 397q51 25 114 0" fill="none" stroke="#F6C5A7" opacity=".65" stroke-width="5" stroke-linecap="round"/>'''

def stems():
    return '''<path d="M248 359V151M248 332Q208 247 160 220M250 330Q296 241 332 205" fill="none" stroke="#4A7846" stroke-width="9" stroke-linecap="round"/>
    <path d="M246 314Q169 308 151 256Q211 240 246 314Z" fill="url(#leaf)"/>
    <path d="M255 297Q336 305 361 249Q303 232 255 297Z" fill="#6E944D"/>
    <path d="M235 261Q168 242 171 187Q220 192 235 261Z" fill="#7CA157"/>
    <path d="M267 243Q324 226 322 170Q279 181 267 243Z" fill="url(#leaf)"/>'''

def flower(cx, cy, petal='#F68EA8', core='#F4CB63', n=9, rx=24, ry=48):
    out = f'<g transform="translate({cx} {cy})">'
    for idx in range(n):
        out += f'<ellipse cx="0" cy="-{ry*.72:.1f}" rx="{rx}" ry="{ry}" transform="rotate({idx*360/n:.1f})" fill="{petal}" stroke="#fff" stroke-opacity=".4" stroke-width="2"/>'
    out += f'<circle r="{rx*.9:.1f}" fill="{core}"/><circle r="{rx*.53:.1f}" fill="#C58D3D" opacity=".35"/></g>'
    return out

rose = stems()+flower(247,159,'#F48DA5','#FFD1C4',9,25,42)+flower(152,210,'#EE9CB1','#FFC2C9',7,16,28)+flower(332,203,'#F8A9BE','#EED1A7',8,16,26)+pot()
(ROOT/'planta-rosa.svg').write_text(svg(rose,'#FCF1F2','#FFE0E8'))

# Folha tipo Monstera com rasgos
monstera_leaves = '''<path d="M252 365V167M255 346Q187 265 166 241M255 338Q315 266 341 230" fill="none" stroke="#3C6E47" stroke-width="11" stroke-linecap="round"/>
<path d="M246 277Q98 266 121 145Q130 91 185 99Q256 126 246 277Z" fill="#4A8A5D"/>
<path d="M257 291Q395 274 386 145Q383 100 332 96Q267 114 257 291Z" fill="#66A16A"/>
<path d="M249 278Q171 305 146 242Q182 207 249 278Z" fill="#7BAD6D"/>
<path d="M252 301Q339 329 369 263Q315 230 252 301Z" fill="#508A59"/>
<path d="M243 273 180 126M255 282 335 125" stroke="#D6E3A5" stroke-opacity=".7" stroke-width="5" stroke-linecap="round"/>
<g fill="#DDE9D4"><ellipse cx="179" cy="154" rx="9" ry="26" transform="rotate(-32 179 154)"/><ellipse cx="202" cy="209" rx="8" ry="23" transform="rotate(-62 202 209)"/><ellipse cx="333" cy="152" rx="9" ry="26" transform="rotate(32 333 152)"/><ellipse cx="302" cy="210" rx="8" ry="22" transform="rotate(60 302 210)"/></g>'''+pot()
(ROOT/'planta-monstera.svg').write_text(svg(monstera_leaves,'#F0F5E7','#DCE8CC'))

succulent = '''<g transform="translate(250 321)">
<g fill="#739A83" stroke="#D4E8D7" stroke-width="3">'''
for j in range(12):
    succulent += f'<ellipse cx="0" cy="-75" rx="30" ry="94" transform="rotate({j*30})"/>'
succulent += '</g><g fill="#A0BDA2" stroke="#E1EFE5" stroke-width="3">'
for j in range(9):
    succulent += f'<ellipse cx="0" cy="-48" rx="25" ry="61" transform="rotate({j*40})"/>'
succulent += '</g><g fill="#B8CEAE">'
for j in range(6): succulent += f'<ellipse cx="0" cy="-25" rx="20" ry="34" transform="rotate({j*60})"/>'
succulent += '</g><circle r="19" fill="#D0DDBB"/></g>'+pot()
(ROOT/'planta-suculenta.svg').write_text(svg(succulent,'#F5F5E9','#E0E8D5'))

lavender = '''<g stroke="#64814C" stroke-width="7" stroke-linecap="round" fill="none"><path d="M250 366 215 128M250 366l41-234M242 356l-95-162M250 363l104-174M254 355V114"/></g>'''
for cx,cy,rot in [(215,125,-7),(290,130,13),(147,197,-31),(354,188,24),(254,115,0)]:
    lavender += f'<g transform="translate({cx} {cy}) rotate({rot})">'
    for i in range(6):
        lavender += f'<ellipse cx="{-9 if i%2 else 9}" cy="{-i*13}" rx="12" ry="17" fill="{["#9776BE","#B497D0","#8770B2"][i%3]}"/>'
    lavender += '</g>'
lavender += '''<path d="M252 338Q194 308 158 284Q184 269 252 338Z" fill="#749750"/><path d="M251 332Q311 311 342 271Q298 273 251 332Z" fill="#6E8C49"/>'''+pot()
(ROOT/'planta-lavanda.svg').write_text(svg(lavender,'#F5F0FB','#E6DDF4'))

sun = '''<path d="M250 356V173" fill="none" stroke="#4A7B40" stroke-width="11" stroke-linecap="round"/>
<path d="M249 321Q163 327 153 259Q225 246 249 321Z" fill="#729D4F"/><path d="M253 296Q339 311 358 254Q288 241 253 296Z" fill="#7FAE52"/>'''+flower(250,182,'#F4C249','#775130',15,22,75)+pot()
(ROOT/'planta-girassol.svg').write_text(svg(sun,'#FBF7E9','#F9EDBE'))

anthurium = '''<path d="M251 357Q237 281 231 215M254 360Q298 266 332 210" fill="none" stroke="#447A4A" stroke-width="9"/>
<path d="M234 282Q113 249 129 137Q166 109 235 199Q294 104 329 143Q349 240 234 282Z" fill="#E98089"/>
<path d="M234 220Q224 195 235 134" stroke="#F8D3B6" stroke-width="13" stroke-linecap="round"/>
<path d="M262 315Q373 305 380 198Q308 207 262 315Z" fill="#468C5D"/>
<path d="M231 346Q130 339 122 247Q188 245 231 346Z" fill="#6A9B58"/>
<path d="M262 314 344 220M229 339 160 267" stroke="#B3D28B" stroke-width="4" opacity=".6"/>'''+pot()
(ROOT/'planta-anturio.svg').write_text(svg(anthurium,'#FBF1F2','#F5DBDE'))

cactus = '''<g fill="#74A17A" stroke="#477952" stroke-width="7"><rect x="188" y="173" width="105" height="220" rx="54"/>
<rect x="139" y="232" width="74" height="125" rx="37" transform="rotate(-25 180 280)"/>
<rect x="285" y="215" width="75" height="120" rx="37" transform="rotate(25 312 240)"/></g>
<g stroke="#D2E5AC" stroke-linecap="round" stroke-width="3">'''
for x,y in [(208,219),(238,214),(266,227),(208,263),(238,270),(269,278),(210,321),(245,333),(269,342),(165,270),(187,306),(316,245),(329,285)]: cactus+=f'<path d="M{x-4} {y}h8M{x} {y-4}v8"/>'
cactus+='</g>'+pot()
(ROOT/'planta-cacto.svg').write_text(svg(cactus,'#F4F4E7','#E8EBD4'))

basil = '''<path d="M248 360V154M249 341Q186 285 160 206M251 335Q321 285 350 198" stroke="#4B7950" stroke-width="10" stroke-linecap="round" fill="none"/>
<path d="M247 316Q157 315 140 246Q210 224 247 316Z" fill="#4D9965"/><path d="M249 308Q344 316 365 236Q297 227 249 308Z" fill="#71A866"/>
<path d="M248 247Q162 231 158 152Q222 165 248 247Z" fill="#66A36B"/><path d="M254 251Q337 223 346 143Q267 165 254 251Z" fill="#53975C"/>
<path d="M249 193Q215 143 243 94Q280 142 249 193Z" fill="#79B76A"/>
<path d="M248 316Q201 286 178 257M251 307Q308 268 334 246M247 245 187 182M255 249 326 170" stroke="#C1DFA0" stroke-width="4" stroke-linecap="round" opacity=".6"/>'''+pot()
(ROOT/'planta-manjericao.svg').write_text(svg(basil,'#EEF5EA','#D5E9D0'))

hero = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 650"><defs><linearGradient id="pot" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#D59D87"/><stop offset="1" stop-color="#B76A59"/></linearGradient></defs>
<path d="M303 528Q169 440 151 314Q151 135 313 110Q470 111 483 293Q483 447 303 528Z" fill="#E5E8C8"/>
<ellipse cx="308" cy="568" rx="154" ry="20" fill="#A2A587" opacity=".22"/>
<g fill="none" stroke="#547D4D" stroke-width="12" stroke-linecap="round"><path d="M309 475V170M307 421Q195 368 169 259M313 407Q421 339 435 234M312 361Q259 244 215 215M318 342Q384 222 397 167"/></g>
<path d="M303 397Q181 411 153 314Q229 296 303 397Z" fill="#6A9A5B"/>
<path d="M315 385Q456 395 472 282Q373 289 315 385Z" fill="#4D8761"/>
<path d="M283 325Q182 301 163 212Q261 207 283 325Z" fill="#83A767"/>
<path d="M333 319Q430 279 443 179Q351 183 333 319Z" fill="#729F60"/>
<path d="M288 242Q222 211 235 131Q293 155 288 242Z" fill="#5E945B"/>
<path d="M332 242Q385 187 363 113Q319 148 332 242Z" fill="#95B375"/>
'''
hero += flower(309,181,'#F68CA9','#F0C05B',10,26,54)
hero += flower(169,259,'#F6BE64','#E4A451',9,20,37)
hero += flower(430,235,'#F8A4B6','#F4D59B',9,20,35)
hero += '''<path d="M202 467h217l-21 91q-6 29-34 29H255q-28 0-34-29z" fill="url(#pot)"/>
<rect x="190" y="451" width="239" height="35" rx="11" fill="#CE8C72"/>
<path d="M236 514q76 30 148 0" fill="none" stroke="#F0C2A7" stroke-width="5" opacity=".7" stroke-linecap="round"/>
<g fill="#F2B0BE"><circle cx="113" cy="155" r="11"/><circle cx="472" cy="113" r="8"/><circle cx="508" cy="378" r="14"/></g><g stroke="#FFF9E7" stroke-width="5"><path d="M114 130v15M105 138h17M484 148v17M475 156h18"/></g></svg>'''
(ROOT/'hero-botanical.svg').write_text(hero)
(ROOT/'leaf-accent.svg').write_text('''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><path d="M43 261Q83 55 249 48Q270 235 43 261Z" fill="#DBE6CD"/><path d="M43 261Q144 141 235 76" fill="none" stroke="#96AB82" stroke-width="8" stroke-linecap="round"/><path d="M110 192 95 124M171 134l-6-64M154 155l78 20" stroke="#96AB82" stroke-width="5"/></svg>''')
(ROOT/'logo.svg').write_text('''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="15" fill="#707318"/><g fill="#F9F8FE"><ellipse cx="24" cy="15.5" rx="5.7" ry="10"/><ellipse cx="24" cy="32.5" rx="5.7" ry="10"/><ellipse cx="15.5" cy="24" rx="10" ry="5.7"/><ellipse cx="32.5" cy="24" rx="10" ry="5.7"/></g><circle cx="24" cy="24" r="5" fill="#F7C065"/></svg>''')
(ROOT/'favicon.svg').write_text((ROOT/'logo.svg').read_text())
print('SVGs gerados:',*[p.name for p in ROOT.glob('*.svg')])
