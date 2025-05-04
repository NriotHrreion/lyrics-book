import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const basePath = path.join(process.cwd(), 'content/docs');

export async function GET(req: NextRequest) {
    const queryPath = req.nextUrl.searchParams.get('path');
    if(!queryPath) {
        return NextResponse.json({ error: 'Lyrics path is required' }, { status: 400 });
    }
    
    const lyricsPath = path.join(basePath, queryPath +'.mdx');
    if(!fs.existsSync(lyricsPath)) {
        return NextResponse.json({ error: 'Lyrics not found' }, { status: 404 });
    }

    const mdxContent = fs.readFileSync(lyricsPath, 'utf-8');

    return NextResponse.json({ data: parseLyricsContent(mdxContent) });
}

function parseLyricsContent(mdxContent: string) {
    const lines = mdxContent.split('\n');
    let song = '';
    let lyrics = '';

    for(let i = 0; i < lines.length; i++) {
        if(lines[i] === '') continue;
        if(lines[i].startsWith('---')) {
            while(!lines[i + 1].startsWith('---')) {
                i++;
                if(lines[i].startsWith('title:')) {
                    song = lines[i].replace('title:', '').trim();
                }
            }
            i += 3;
        }

        lyrics += lines[i] + '\n';
    }

    return { song, lyrics };
}
