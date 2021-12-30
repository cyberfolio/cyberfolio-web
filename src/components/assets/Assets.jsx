import React from 'react'
import { AssetTable } from '../asset-table/AssetTable'
import './Assets.scss'

export const Assets = () => {
    return (
        <div className='assets'>
            <div className='assets__links'>
            <div className='assets__links__link assets__links__link--active'>All</div>
            <div className='assets__links__link'>CEX</div>
            <div className='assets__links__link'>DEX</div>
            <div className='assets__links__link'>NFTs</div>
            </div>
            

            <div className='assets__table'>
                <AssetTable />
            </div>
        </div>
       
    )
}
