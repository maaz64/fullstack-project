

function Post({ post }) {
    return (
        <>

            <figure className="flex flex-col items-center justify-center p-8 text-center bg-green-50 border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700 ">
                <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{post.title}</h3>
                    <p className="my-4">{post.content}</p>
                </blockquote>
                <figcaption className="flex items-center justify-center ">
                    {/* <img className="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png" alt="profile picture" /> */}
                    <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                        <div>{post.user.fullName}</div>
                    </div>
                </figcaption>
            </figure>
        </>


    )
}

export default Post
