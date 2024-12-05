export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 p-4 py-8 mt-10 flex justify-center">
      <div className="max-w-5xl mx-auto text-gray-700 dark:text-gray-300">
        <div className="flex justify-center items-center flex-col gap-6 mb-6">
          {/* About Section */}
          <div>
            <h4 className="font-bold text-lg mb-3">CraneoBlog</h4>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="font-bold text-lg mb-3">Newsletter</h4>
            <p className="text-sm mb-4">
              Subscribe to my newsletter for firsthand notification of my writings.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 rounded-l-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300"
              />
              <button className="bg-gray-500 dark:bg-gray-600 text-white px-4 rounded-r-lg hover:bg-blue-600 dark:hover:bg-blue-700">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          © 2024 MyBlog. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
