function Homepage (){
    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white py-20 min-h-screen flex items-center">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                        Welcome to <span className="text-yellow-400">GramRoute</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 opacity-90">
                        Your ultimate navigation companion
                    </p>
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105">
                        Get Started
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                        Why Choose GramRoute?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
                            <div className="text-4xl mb-4">🗺️</div>
                            <h3 className="text-xl font-semibold mb-3">Smart Navigation</h3>
                            <p className="text-gray-600">Students can contribute to their country</p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
                            <div className="text-4xl mb-4">⚡</div>
                            <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
                            <p className="text-gray-600">Action is prioritized to the requests directly from app</p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
                            <div className="text-4xl mb-4">🎯</div>
                            <h3 className="text-xl font-semibold mb-3">Precise Location</h3>
                            <p className="text-gray-600">Can get help to accurate locations</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gray-900 text-white py-16">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
                    <p className="text-lg mb-8 opacity-90">Join thousands of users who trust GramRoute</p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                        Start Navigation
                    </button>
                </div>
            </section>
        </div>
    )
}

export default Homepage;