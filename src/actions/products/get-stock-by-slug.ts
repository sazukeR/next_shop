"use server"

import { sleep } from '@/utils';
import prisma from '../../lib/prisma';




// solo retornara cantidad que hay en stock
export const getStockBySlug = async(slug: string): Promise<number> => {


try {

    await sleep(3);


    const stock = await prisma.product.findFirst({
        where: { slug },
        select: { inStock: true },
    })


    return stock?.inStock ?? 0;

    
} catch (error) {
    return 0;
}



}