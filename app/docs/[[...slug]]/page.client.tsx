"use client";

import { Button } from "@/components/button";
import { githubUrl, siteUrl } from "@/lib/global";
import { writeToClipboard } from "@/lib/utils";

interface PageToolProps {
    page: string
}

export function EditOnGithub({ page }: PageToolProps) {
    return (
        <Button href={`${githubUrl}/blob/main/content/docs/${page}`}>
            Edit on GitHub
        </Button>
    );
}

export function GoToAPI({ page }: PageToolProps) {
    return (
        <Button href={`/api/lyrics?path=/${page.replace('.mdx', '')}`}>
            查看 API
        </Button>
    );
}

export function CopyAPI({ page }: PageToolProps) {
    const apiUrl = `${siteUrl}/api/lyrics?path=/${page.replace('.mdx', '')}`;

    return (
        <Button onClick={async () => {
            await writeToClipboard(apiUrl);
            alert(`复制成功\nURL: ${apiUrl}`);
        }}>
            复制 API
        </Button>
    );
}
