import { LitElement, html } from 'lit'

class ListStory extends LitElement {
  createRenderRoot() {
    return this
  }

  async init() {
    await this._initialData()
    this.requestUpdate()
  }

  connectedCallback() {
    super.connectedCallback()
    this.init()
  }

  stories = []
  isLoading = false

  async _initialData() {
    this.isLoading = true
    try {
      const fetchRecords = await fetch('/data/Data.json')
      const response = await fetchRecords.json()
      if (response && response.listStory) {
        this.stories = response.listStory
        this.isLoading = false
      } else {
        console.log('Data tidak ditemukan dalam JSON.')
        this.isLoading = false
      }
    } catch (error) {
      console.log('Error :', error)
      this.isLoading = false
    }

    function hideAlert() {
      var alertElement = document.querySelector('.alert')
      if (alertElement) {
        alertElement.remove()
      }
    }

    setTimeout(hideAlert, 4000)
  }

  render() {
    if (this.isLoading === true) {
      return html`
        <div class="loading">
          <div class="loading-logo">
            <div class="spinner-grow text-danger" role="status"></div>
            <div class="spinner-grow mx-3 text-warning" role="status"></div>
            <div class="spinner-grow text-success" role="status"></div>
          </div>
          <span class="mt-1">Mengambil data ...</span>
        </div>
      `
    } else {
      return html`
        <div class="alert alert-success d-flex align-items-center mt-5" role="alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-check-circle-fill me-2"
            viewBox="0 0 16 16"
          >
            <path
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 
              0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 
              0 0 0-1.06 1.06L6.97 11.03a.75.75 
              0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
            />
          </svg>
          <div>Berhasil mendapatkan data!</div>
        </div>

        <div class="slogan">"Satu Klik, Sejuta Kisah."</div>

        <div class="row pt-4">
          ${this.stories.map((story) => {
            const options = {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric'
            }

            const formattedDate = new Date(story.createdAt).toLocaleDateString('id-ID', options)

            return html`
              <div class="col-lg-4 col-md-6">
                <div class="card mb-4 custom-card">
                  <img src="${story.photoUrl}" class="card-img-top" alt="gambar" />
                  <div class="card-body">
                    <h5 class="card-title">${story.name}</h5>
                    <p class="card-text">${story.description}</p>
                    <span class="badge text-bg-primary p-1">${formattedDate}</span>
                  </div>
                </div>
              </div>
            `
          })}
        </div>
      `
    }
  }
}
customElements.define('list-story', ListStory)

export default ListStory
