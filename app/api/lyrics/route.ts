import { NextRequest, NextResponse } from 'next/server';
const lyricsFiles = import.meta.glob<string>('/content/docs/**/*.mdx', {
    query: '?raw',
    import: 'default',
});

export async function GET(req: NextRequest) {
    const queryPath = req.nextUrl.searchParams.get('path');
    if(!queryPath) {
        return NextResponse.json({ error: 'Lyrics path is required' }, { status: 400 });
    }
    
    const normalizedPath = queryPath.replace(/^\/+/, '');
    const loadLyrics = lyricsFiles[`/content/docs/${normalizedPath}.mdx`];
    if(!loadLyrics) {
        return NextResponse.json({ error: 'Lyrics not found' }, { status: 404 });
    }

    const mdxContent = await loadLyrics();

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
