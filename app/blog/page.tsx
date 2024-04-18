import { posts } from '#site/content'
import { PostItem } from '@/components/PostItem'
import { QueryPagination } from '@/components/QueryPagination';
import { sortPosts } from '@/lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Blogs",
    description: "Collection of latest blogs"
}

const POSTS_PER_PAGE = 4
interface BlogPageProps {
    searchParams: {
        page?: string
    }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {

    const currentPage = Number(searchParams?.page) || 1
    const sortedPosts = sortPosts(posts.filter(post => post.published))
    const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE)

    const displayPosts = sortedPosts.slice(
        POSTS_PER_PAGE * (currentPage - 1),
        POSTS_PER_PAGE * currentPage
    )




    return (
        <div className="container max-w-4xl py-6 lg:py-10 ">
            <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
                <div className="flex-1 space-y-4">
                    <h1 className="inline-block font-black text-3xl lg:text-4xl">Blog</h1>
                    <p className="text-xl text-muted-foreground ">Description of blog</p>
                </div>
            </div>
            <hr className="mt-8" />

            <QueryPagination totalPages={totalPages} className='justify-center my-5' />
            {displayPosts?.length > 0 ? (
                <ul className='flex flex-col'>
                    {displayPosts?.map(post => {
                        const { slug, date, title, description } = post
                        return (
                            <li key={slug}>
                                <PostItem slug={slug} date={date} title={title} description={description} />
                            </li>
                        )
                    })}
                </ul>
            ) : (
                <p className='flex w-full h-dvh sm:h-[50vh]  justify-center items-center text-3xl font-black'>Nothing to see here yet</p>
            )}

        </div>
    )
}