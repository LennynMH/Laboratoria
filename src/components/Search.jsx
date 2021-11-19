

export const Search = ({ onChange, onClick }) => {

  return (
    <section className="searchProducts">
      <div className="input-group">
        <input type="search" className="form-control mySearchProducts" onChange={onChange} placeholder="Buscar" aria-label="Search"
          aria-describedby="search-addon" name />
        <span className="input-group-text mySearchProducts" id="search-addon">
          <i onClick={onClick} className="fas fa-search"></i>
        </span>
      </div>
    </section>
  )
}