import { FC } from 'react'

type cirlePropsTypes = {
    children: React.ReactNode
    size?: number
    count: number
    period?: number // seconds
    strokeWidth?: number,
}

/**
 * @author Miracle Boniface
 * @description This component is responsible for creating and managing the svg circles, sizes are responsive
 * @function Circle 
 * @param {React.ReactNode} children - The children node
 * @param {number} size - The size of the circles and svg relative - Default: 40
 * @param {number} count - The number of counts for the circle's strokeDashArray and strokeDashOffset properties
 * @param {number} period - The number of seconds for period - Default: 60
 * @param {number} strokeWidth - The stroke width of the circles
*/
const Circle: FC<cirlePropsTypes> = ({ children, size = 40, count, period = 60, strokeWidth = 3, }) => {
    const constant: number = 6
    const strokeDash = size * 3
    return (
        <svg className='relative' width={size} height={size}>
            <circle cx={(size - constant) / 2} cy={(size - constant) / 2} r={(size - constant) / 2} className={`w-full h-full fill-none stroke-white  translate-x-[3px] translate-y-[3px]`} style={{
                strokeLinecap: 'round',
                strokeWidth: strokeWidth,
            }}></circle>
            <circle cx={(size - constant) / 2} cy={(size - constant) / 2} r={(size - constant) / 2} className={`w-full h-full fill-none stroke-[--foreground-green] z-50  translate-x-[3px] translate-y-[3px]`} style={{
                strokeLinecap: 'square',
                strokeWidth: strokeWidth,
                strokeDasharray: strokeDash,
                strokeDashoffset: strokeDash - ((count / period) * strokeDash),
            }}></circle>
            <foreignObject x="0" y="0" width={size} height={size}>
                <div className='flex items-center justify-center w-full h-full'>
                    {children}
                </div>
            </foreignObject>
        </svg>
    )
}

export default Circle