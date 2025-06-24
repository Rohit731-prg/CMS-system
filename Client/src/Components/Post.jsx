import React, { useState } from 'react';
import Press from './AddPost/Press';
import Blogs from './AddPost/Blogs';
import Flims from './AddPost/Flims';
import Sidebar from './Sideber';

function Post() {
    const navBer = [
        {id: 0, name: "Press", link: '/'},
        {id: 1, name: "Blogs", link: '/'},
        {id: 2, name: "Flims", link: '/'},
    ];
    const [id, setID] = useState(0);

  return (
    <main className='flex'>
        <Sidebar />

        <section>
            <nav>
                {navBer.map((nav, index) => (
                    <button
                    onClick={() => setID(nav.id)}
                    
                    >
                        {nav.name}
                    </button>
                ))}
            </nav>

            {id === 0 && <Press />}
            {id === 1 && <Blogs />}
            {id === 2 && <Flims />}
        </section>
    </main>
  )
}

export default Post