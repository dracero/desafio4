let productosdb = [];

class Producto {
    constructor(productos){
        this.productos = productos;
    }

    save(title,price,thumbnail){
        let db = this.productos
        let nuevoProducto= {
            id: db.length + 1,
            title: title,
            price: price,
            thumbnail: thumbnail
        }
        db.push(nuevoProducto)
    }

    update(ind,title,price,thumbnail){
       try{ 
        let updb = this.productos;
        let index = updb.findIndex(x => x.id == ind);
        updb[index].id = ind;
        updb[index].title = title;
        updb[index].price = price;
        updb[index].thumbnail = thumbnail;
        return updb;
        } catch{
            throw new Error('producto no encontrado') 
        }
    }     

    getAll(){
        return this.productos
    }

    getById(ind){
        let db = this.productos;
        let index = db.findIndex(x => x.id == ind);
        return db[index];
    }

    delById(ind){
        let db = this.productos;
        let index = db.findIndex(x => x.id == ind);
        let erase = db[index]
        db.splice(index,1);
        return erase;
    }

}

let productos = new Producto(productosdb)
export default productos;