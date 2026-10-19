"""Add readable spacing while preserving every nonblank scenario line verbatim."""
from pathlib import Path
import re
ROOT=Path(__file__).resolve().parents[1]
def category(line):
    if line.startswith('# '):return 'label'
    if line.startswith('>'):return 'narration'
    if re.match(r'^\w+:',line):return line.split(':',1)[0]
    if line.startswith('- '):return 'choice'
    return 'command'
def main():
    count=0
    for path in (ROOT/'scenarios').rglob('*.md'):
        before=[line for line in path.read_text(encoding='utf8').splitlines() if line.strip()]
        out=[];last=None
        for line in before:
            kind=category(line)
            if out and (kind!=last or kind=='label' or last=='label'):out.append('')
            out.append(line);last=kind
        assert [line for line in out if line.strip()]==before
        path.write_text('\n'.join(out)+'\n',encoding='utf8');count+=1
    print('Formatted',count,'scripts; all nonblank lines preserved verbatim.')
if __name__=='__main__':main()
