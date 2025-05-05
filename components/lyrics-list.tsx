import { Cards, Card } from 'fumadocs-ui/components/card';
import { source } from '@/lib/source';

interface LyricsListProps {
    artist: string
}

export function LyricsList({ artist }: LyricsListProps) {
    return (
        <Cards className='grid-cols-3'>
            {
                source.getPages().map((page, index) => (
                    page.url.startsWith(`/docs/${artist}/`)
                    ? (
                        <Card key={index} title={page.data.title} href={page.url}>
                            {page.data.description}
                        </Card>
                    )
                    : null
                ))
            }
        </Cards>
    );
}
