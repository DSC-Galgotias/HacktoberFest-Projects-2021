const data = [
    {
        name: 'John',
        age: '18',
        city: 'Noida',
        language: 'C++',
        framework: 'react',
        image: 'https://randomuser.me/api/portraits/men/75.jpg'

    },
    {
        name: 'rohan',
        age: '28',
        city: 'varanasi',
        language: 'C',
        framework: 'vue',
        image: 'https://randomuser.me/api/portraits/men/74.jpg'

    },
    {
        name: 'ayush',
        age: '38',
        city: 'goa',
        language: 'python',
        framework: 'django',
        image: 'https://randomuser.me/api/portraits/men/76.jpg'

    },
    {
        name: 'Riya',
        age: '19',
        city: 'Delhi',
        language: 'Java',
        framework: 'Angular',
        image: 'https://randomuser.me/api/portraits/women/75.jpg'

    },
    {
        name: 'Priya',
        age: '40',
        city: 'Mumbai',
        language: 'Python',
        framework: 'flask',
        image: 'https://randomuser.me/api/portraits/men/79.jpg'

    }
]
// CV Iterator
function cvIterator(profiles){
    let nextIndex=0;
    return {
        next: function(){
            return nextIndex<profiles.length ?
            {value: profiles[nextIndex++], done: false} :
            {done: true}
        }
    };
}
const candidates = cvIterator(data);

nextCV();
// Button listener for next button
const next = document.getElementById('next');
next.addEventListener('click', nextCV);


function nextCV(){
    const currentCandidate = candidates.next().value;
    let image = document.getElementById('image');
    let profile = document.getElementById('profile');
    if(currentCandidate != undefined){
    image.innerHTML = `<img src='${currentCandidate.image}'>`;
    profile.innerHTML = `<ul class="list-group">
    <li class="list-group-item">Name: ${currentCandidate.name}</li>
    <li class="list-group-item">${currentCandidate.age} years old</li>
    <li class="list-group-item">Lives in ${currentCandidate.city}</li>
    <li class="list-group-item">Primarily works on ${currentCandidate.language}</li>
    <li class="list-group-item">Uses ${currentCandidate.framework} framework</li>
  </ul>`;
    }
    else{
        alert('End of candidate applications');
        window.location.reload();
    }

}