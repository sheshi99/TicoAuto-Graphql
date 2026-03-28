function validarPaginacion(page, limit) {
    const pagina = parseInt(page);
    const limite = parseInt(limit);

    if (isNaN(pagina) || pagina < 1) {
        return {
            error: "La página debe ser un número mayor o igual a 1"
        };
    }

    if (isNaN(limite) || limite < 1) {
        return {
            error: "El límite debe ser un número mayor o igual a 1"
        };
    }

    return { pagina, limite };
}

function validarRangos(anno_min, anno_max, precio_min, precio_max) {
    const annoMinNum = anno_min ? parseInt(anno_min) : null;
    const annoMaxNum = anno_max ? parseInt(anno_max) : null;
    const precioMinNum = precio_min ? parseInt(precio_min) : null;
    const precioMaxNum = precio_max ? parseInt(precio_max) : null;

    if (anno_min && (isNaN(annoMinNum) || annoMinNum < 0)) {
        return {
            error: "El año mínimo debe ser un número válido mayor o igual a 0"
        };
    }

    if (anno_max && (isNaN(annoMaxNum) || annoMaxNum < 0)) {
        return {
            error: "El año máximo debe ser un número válido mayor o igual a 0"
        };
    }

    if (precio_min && (isNaN(precioMinNum) || precioMinNum < 0)) {
        return {
            error: "El precio mínimo debe ser un número válido mayor o igual a 0"
        };
    }

    if (precio_max && (isNaN(precioMaxNum) || precioMaxNum < 0)) {
        return {
            error: "El precio máximo debe ser un número válido mayor o igual a 0"
        };
    }

    if (anno_min && anno_max && annoMinNum > annoMaxNum) {
        return {
            error: "El año mínimo no puede ser mayor al año máximo"
        };
    }

    if (precio_min && precio_max && precioMinNum > precioMaxNum) {
        return {
            error: "El precio mínimo no puede ser mayor al precio máximo"
        };
    }

    return { annoMinNum, annoMaxNum, precioMinNum, precioMaxNum };
}

function validarEstado(estado) {
    if (!estado) {
        return {};
    }

    const estadosValidos = ['Disponible', 'Vendido'];

    if (!estadosValidos.includes(estado)) {
        return {
            error: "Estado inválido"
        };
    }

    return {};
}

function validarFiltroVehiculos(query) {
    const { anno_min, anno_max, precio_min, precio_max, estado, page, limit } = query;

    const paginacion = validarPaginacion(page, limit);
    if (paginacion.error) {
        return paginacion;
    }

    const rangos = validarRangos(anno_min, anno_max, precio_min, precio_max);
    if (rangos.error) {
        return rangos;
    }

    const estadoValidado = validarEstado(estado);
    if (estadoValidado.error) {
        return estadoValidado;
    }

    //Une los objetos en uno solo
    return {
        ...paginacion,
        ...rangos
    };
}

module.exports = validarFiltroVehiculos;