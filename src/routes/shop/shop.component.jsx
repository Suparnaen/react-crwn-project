import { Routes, Route } from 'react-router-dom';
import './shop.styles.scss';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

const Shop = () => {

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} />
        </Routes>

    )

}

export default Shop;

/**
 * <Fragment>
            {
                Object.keys(categoriesMap).map(title => (
                    <Fragment key={title}>
                        <h2>{title}</h2>
                        <div className='products-container'>
                            {categoriesMap[title].map((product) => (
                                <ProductCard key={product.id} product={product} />

                            ))}
                        </div>
                    </Fragment>
                ))
            }
        </Fragment>
 */