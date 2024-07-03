
async function loadChangelog(url) {
    try {
        const response = await fetch(url);
        const changelog = await response.json();

        const changelogContainer = document.getElementById('changelog');
        changelogContainer.innerHTML = ''; // Clear any existing content

        changelog.forEach(item => {

            const changelogItem = document.createElement('div');
            changelogItem.classList.add('changelog-item');

            const versionAndDateContainer = document.createElement('div');
            versionAndDateContainer.classList.add('version-date-container');

            const version = document.createElement('div');
            version.classList.add('version', item.stage.toLowerCase().replace(' ', '-'));
            version.textContent = `Version ${item.version} - ${item.stage}`;

            const uploadedOn = document.createElement('div');
            uploadedOn.classList.add('uploaded-on');
            uploadedOn.textContent = `Uploaded on ${item.uploaded_on}`;

            versionAndDateContainer.appendChild(version);
            versionAndDateContainer.appendChild(uploadedOn);

            const details = document.createElement('div');
            details.classList.add('details');
            item.details.forEach(detail => {
                const detailItem = document.createElement('p');
                detailItem.textContent = `- ${detail}`;
                details.appendChild(detailItem);
            });

            changelogItem.appendChild(versionAndDateContainer);
            changelogItem.appendChild(details);

            changelogContainer.appendChild(changelogItem);


        });
    } catch (error) {
        console.error('Error fetching changelog:', error);
    }
}

// Load the changelog when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const changelogUrl = document.getElementById('changelog').getAttribute('data-url');
    loadChangelog(changelogUrl);
});
