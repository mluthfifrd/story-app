import { LitElement, html } from 'lit'

class AddStory extends LitElement {
  createRenderRoot() {
    return this
  }

  render() {
    return html`
      <div class="body mt-4">
        <h2 class="text-center">Tambah Story</h2>
        <div class="row g-3">
          <form class="was-validated">
            <div class="col mb-3">
              <label for="validationTextarea" class="form-label">Deskripsi Story</label>
              <textarea
                class="form-control"
                id="validationTextarea"
                placeholder="Required example textarea"
                required
                oninvalid="this.setCustomValidity('Tidak boleh kosong')"
                oninput="setCustomValidity('')"
              ></textarea>
              <div class="invalid-feedback">Wajib mengisi deskripsi.</div>
            </div>

            <div class="col mb-3">
              <label for="validationTextarea" class="form-label">Gambar Story</label>
              <input
                type="file"
                class="form-control"
                aria-label="file example"
                required
                oninvalid="this.setCustomValidity('Tidak boleh kosong')"
                oninput="setCustomValidity('')"
              />
              <div class="invalid-feedback">Wajib mengunggah gambar</div>
            </div>

            <div class="mb-3">
              <button class="btn btn-primary" type="submit">Submit form</button>
            </div>
          </form>
        </div>
      </div>
    `
  }
}
customElements.define('add-story', AddStory)

export default AddStory
