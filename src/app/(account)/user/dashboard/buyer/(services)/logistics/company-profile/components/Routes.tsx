'use client'
import { FC, useState } from 'react'
import interFont from '@/fonts/Inter'
import openSansFont from '@/fonts/OpenSans'
import { Icon } from '@iconify/react/dist/iconify.js'
import { FaChevronUp, FaStar } from 'react-icons/fa'
import { useSimpleCollectedItems } from '../../CollectedData'

interface StateItems {
  id: number;
  name: string;
}

const states: StateItems[] = [{id: 1, name: 'umuahia'}, {id: 2, name: 'jos'}, {id: 3, name: 'akwa-ibom'}, {id: 4, name: 'anambra'}, {id: 5, name: 'bauchi'}, {id: 6, name: 'bayelsa'}, {id: 7, name: 'delta'}, {id: 8, name: 'ebonyi'}, {id: 9, name: 'plateau'}, {id: 10, name: 'niger'}, {id: 11, name: 'kogi'}]

interface RoutesProps {
  activeTab: string;
  setActiveTab: (subTabId: string) => void;
}

const Pickup: FC = () => {
  const [count, setCount] = useState(1);
  return(
  <div className='mb-60'>
    <div className="row flex justify-between items-center my-5">
      <button className='flex items-center gap-2 text-[#1F2024] py-[10px] px-3 rounded-xl border-[0.5px] border-[#C5C6CC]'>
        <Icon icon='fluent:arrow-sort-16-regular' className='text-[#8F9098] text-sm' />
        Single
        <Icon icon='tabler:chevron-down' className='text-[#C5C6CC] text-sm' />
      </button>
      <div className='flex items-center text-sm tracking-wide gap-2'>
        <p>Add Location</p>
        <button onClick={() => {
          if(count <= 1) {
            return 1
          } else{
            setCount(count - 1)
          }
        }} className='w-6 h-6 rounded-full flex items-center justify-center text-lg bg-[#EAF2FF] leading-[0]'>
          <Icon icon='flowbite:minus-outline' className='text-sm' />
        </button>
        <span>{count}</span>
        <button onClick={() => setCount(count + 1)} className='w-6 h-6 rounded-full flex items-center justify-center text-lg bg-[#EAF2FF] leading-[0]'>
          <Icon icon='flowbite:plus-outline' className='text-sm' />
        </button>
      </div>
    </div>

    <section className="locations">
      <div className="row flex justify-between items-center">
        <div className="col">
          <h2 className='text-[#1F2024]'>State</h2>
          <p className='text-[#71727A] text-sm tracking-wide'>Available in Nigeria</p>
        </div>
        <div className="col">
          <div className='w-6 h-6 rounded-full flex items-center justify-center text-sm bg-[--foreground-green] text-white leading-[0]'>9</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 my-5">
        {states.map(state => (<div className='px-3 py-[6px] text-[--foreground-green] bg-[#EAF2FF] text-sm uppercase tracking-wider rounded-2xl'>{state.name}</div>))}
      </div>

      <div className="row flex justify-between items-center">
        <div className="col">
          <h2 className='text-[#1F2024]'>City</h2>
          <p className='text-[#71727A] text-sm tracking-wide'>Available in Nigeria</p>
        </div>
        <div className="col">
          <Icon icon='tabler:chevron-down' className='text-[--foreground-green] text-base' />
        </div>
      </div>
      <div className="flex justify-center overflow-hidden rounded-2xl relative">
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d63606.966379454316!2d7.103640400000001!3d4.866482649999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sng!4v1752212307109!5m2!1sen!2sng" width="1000" height="500" style={{border: '0'}}></iframe>
        <div className="rounded-3xl p-2 flex items-center justify-center bg-[#F8F9FE] absolute top-5 left-1/2 -translate-x-1/2 gap-3 md:w-[90%] w-[95%]">
          <Icon icon='tabler:search' className='text-xl' />
          <input type="search" className='flex-grow outline-none border-none bg-transparent' placeholder='Street Info' />
          <Icon icon='tabler:chevron-up' className='text-xl' />
        </div>
      </div>
    </section>
  </div>
  )
}

const Dropoff: FC = () => {
  const [count, setCount] = useState(1)
  const [activeDropdown, setActiveDropdown] = useState(false)
  const [dropdownContent, setDropdownContent] = useState('Multiple')
  const [activeAmount, setActiveAmount] = useState('uyo')
  const [miniTab, setMiniTab] = useState('1')
  const {getCollectedItem, addOrUpdateItem} = useSimpleCollectedItems()
  return(
  <div className='mb-60'>
    <div className="row flex justify-between items-center my-5">
      <div className='relative'>
        <button onClick={() => setActiveDropdown(!activeDropdown)} className='flex items-center gap-2 text-[#1F2024] py-[10px] px-3 rounded-xl border-[0.5px] border-[#C5C6CC]'>
          <Icon icon='fluent:arrow-sort-16-regular' className='text-[#8F9098] text-sm' />
          {dropdownContent}
          <Icon icon='tabler:chevron-down' className='text-[#C5C6CC] text-sm' />
        </button>
        <div className={`absolute left-0 w-full bg-white pb-5 pt-2 ${activeDropdown ? 'block' : 'hidden'}`}>
          <p onClick={() => {setDropdownContent('Multiple'); setActiveDropdown(false)}} className={`hover:bg-[#c5c6cc] p-2 cursor-pointer`}>Multiple</p>
          <p onClick={() => {setDropdownContent('Express'); setActiveDropdown(false)}} className={`hover:bg-[#c5c6cc] p-2 cursor-pointer`}>Express</p>
        </div>
      </div>
    </div>
    {dropdownContent === 'Multiple' ? (
      <>
        <div className='flex items-center text-sm tracking-wide gap-2'>
          <p>Add Location</p>
          <button onClick={() => {
            if(count <= 1) {
              return 1
            } else{
              setCount(count - 1)
            }
          }} className='w-6 h-6 rounded-full flex items-center justify-center text-lg bg-[#EAF2FF] leading-[0]'>
            <Icon icon='flowbite:minus-outline' className='text-sm' />
          </button>
          <span>{count}</span>
          <button onClick={() => {
            if(count >= 4) {
              return 4
            } else{
              return setCount(count + 1)
            }
            }} className='w-6 h-6 rounded-full flex items-center justify-center text-lg bg-[#EAF2FF] leading-[0]'>
            <Icon icon='flowbite:plus-outline' className='text-sm' />
          </button>
        </div>
        <div className="w-full flex justify-between items-center my-5">
          <div onClick={() => {count >= 1 ? setMiniTab('1') : null}} className={`w-8 h-8 cursor-pointer justify-center items-center rounded-full ${miniTab === '1' ? 'bg-[#006838] text-white' : 'bg-[#eaf2ff]'} ${count >= 1 ? 'flex' : 'hidden'}`}>1</div>
          <div onClick={() => {count >= 2 ? setMiniTab('2') : null}} className={`w-8 h-8 cursor-pointer justify-center items-center rounded-full ${miniTab === '2' ? 'bg-[#006838] text-white' : 'bg-[#eaf2ff]'} ${count >= 2 ? 'flex' : 'hidden'}`}>2</div>
          <div onClick={() => {count >= 3 ? setMiniTab('3') : null}} className={`w-8 h-8 cursor-pointer justify-center items-center rounded-full ${miniTab === '3' ? 'bg-[#006838] text-white' : 'bg-[#eaf2ff]'} ${count >= 3 ? 'flex' : 'hidden'}`}>3</div>
          <div onClick={() => {count >= 4 ? setMiniTab('4') : null}} className={`w-8 h-8 cursor-pointer justify-center items-center rounded-full ${miniTab === '4' ? 'bg-[#006838] text-white' : 'bg-[#eaf2ff]'} ${count >= 4 ? 'flex' : 'hidden'}`}>4</div>
        </div>
        {miniTab === '1' && (
          <section className="locations">
            <div className="row flex justify-between items-center">
              <div className="col">
                <h2 className='text-[#1F2024]'>State</h2>
                <p className='text-[#71727A] text-sm tracking-wide'>Available in Nigeria</p>
              </div>
              <div className="col">
                <div className='w-6 h-6 rounded-full flex items-center justify-center text-sm bg-[--foreground-green] text-white leading-[0]'>9</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 my-5">
              {states.map((state) => { 
                const isSelected = getCollectedItem(state.id) !== undefined;
                return (
                  <div onClick={() => addOrUpdateItem(state)} className={`px-3 py-[6px] text-sm uppercase tracking-wider rounded-2xl ${isSelected ? 'bg-[#006838] text-white' : 'text-[--foreground-green] bg-[#EAF2FF] '}`}>{state.name}</div>
                ) 
              })}
            </div>

            <div className="row flex justify-between items-center">
              <div className="col">
                <h2 className='text-[#1F2024]'>City</h2>
                <p className='text-[#71727A] text-sm tracking-wide'>Available in Nigeria</p>
              </div>
              <div className="col">
                <Icon icon='tabler:chevron-down' className='text-[--foreground-green] text-base' />
              </div>
            </div>
            <div className="flex justify-center overflow-hidden rounded-2xl relative">
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d63606.966379454316!2d7.103640400000001!3d4.866482649999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sng!4v1752212307109!5m2!1sen!2sng" width="1000" height="500" style={{border: '0'}}></iframe>
              <div className="rounded-3xl p-2 flex items-center justify-center bg-[#F8F9FE] absolute top-5 left-1/2 -translate-x-1/2 gap-3 md:w-[90%] w-[95%]">
                <Icon icon='tabler:search' className='text-xl' />
                <input type="search" className='flex-grow outline-none border-none bg-transparent' placeholder='Street Info' />
                <Icon icon='tabler:chevron-up' className='text-xl' />
              </div>
            </div>
          </section>
        )}
        {miniTab === '2' && (
          <section className="locations">
            <div className="row flex justify-between items-center">
              <div className="col">
                <h2 className='text-[#1F2024]'>State</h2>
                <p className='text-[#71727A] text-sm tracking-wide'>Available in Nigeria</p>
              </div>
              <div className="col">
                <div className='w-6 h-6 rounded-full flex items-center justify-center text-sm bg-[--foreground-green] text-white leading-[0]'>9</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 my-5">
              {states.map(state => (<div className='px-3 py-[6px] text-[--foreground-green] bg-[#EAF2FF] text-sm uppercase tracking-wider rounded-2xl'>{state.name}</div>))}
            </div>

            <div className="row flex justify-between items-center">
              <div className="col">
                <h2 className='text-[#1F2024]'>City</h2>
                <p className='text-[#71727A] text-sm tracking-wide'>Available in Nigeria</p>
              </div>
              <div className="col">
                <Icon icon='tabler:chevron-down' className='text-[--foreground-green] text-base' />
              </div>
            </div>
            <div className="flex justify-center overflow-hidden rounded-2xl relative">
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d63606.966379454316!2d7.103640400000001!3d4.866482649999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sng!4v1752212307109!5m2!1sen!2sng" width="1000" height="500" style={{border: '0'}}></iframe>
              <div className="rounded-3xl p-2 flex items-center justify-center bg-[#F8F9FE] absolute top-5 left-1/2 -translate-x-1/2 gap-3 md:w-[90%] w-[95%]">
                <Icon icon='tabler:search' className='text-xl' />
                <input type="search" className='flex-grow outline-none border-none bg-transparent' placeholder='Street Info' />
                <Icon icon='tabler:chevron-up' className='text-xl' />
              </div>
            </div>
          </section>
        )}
        {miniTab === '3' && (
          <section className="locations">
            <div className="row flex justify-between items-center">
              <div className="col">
                <h2 className='text-[#1F2024]'>State</h2>
                <p className='text-[#71727A] text-sm tracking-wide'>Available in Nigeria</p>
              </div>
              <div className="col">
                <div className='w-6 h-6 rounded-full flex items-center justify-center text-sm bg-[--foreground-green] text-white leading-[0]'>9</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 my-5">
              {states.map(state => (<div className='px-3 py-[6px] text-[--foreground-green] bg-[#EAF2FF] text-sm uppercase tracking-wider rounded-2xl'>{state.name}</div>))}
            </div>

            <div className="row flex justify-between items-center">
              <div className="col">
                <h2 className='text-[#1F2024]'>City</h2>
                <p className='text-[#71727A] text-sm tracking-wide'>Available in Nigeria</p>
              </div>
              <div className="col">
                <Icon icon='tabler:chevron-down' className='text-[--foreground-green] text-base' />
              </div>
            </div>
            <div className="flex justify-center overflow-hidden rounded-2xl relative">
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d63606.966379454316!2d7.103640400000001!3d4.866482649999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sng!4v1752212307109!5m2!1sen!2sng" width="1000" height="500" style={{border: '0'}}></iframe>
              <div className="rounded-3xl p-2 flex items-center justify-center bg-[#F8F9FE] absolute top-5 left-1/2 -translate-x-1/2 gap-3 md:w-[90%] w-[95%]">
                <Icon icon='tabler:search' className='text-xl' />
                <input type="search" className='flex-grow outline-none border-none bg-transparent' placeholder='Street Info' />
                <Icon icon='tabler:chevron-up' className='text-xl' />
              </div>
            </div>
          </section>
        )}
        {miniTab === '4' && (
          <section className="locations">
            <div className="row flex justify-between items-center">
              <div className="col">
                <h2 className='text-[#1F2024]'>State</h2>
                <p className='text-[#71727A] text-sm tracking-wide'>Available in Nigeria</p>
              </div>
              <div className="col">
                <div className='w-6 h-6 rounded-full flex items-center justify-center text-sm bg-[--foreground-green] text-white leading-[0]'>9</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 my-5">
              {states.map(state => (<div className='px-3 py-[6px] text-[--foreground-green] bg-[#EAF2FF] text-sm uppercase tracking-wider rounded-2xl'>{state.name}</div>))}
            </div>

            <div className="row flex justify-between items-center">
              <div className="col">
                <h2 className='text-[#1F2024]'>City</h2>
                <p className='text-[#71727A] text-sm tracking-wide'>Available in Nigeria</p>
              </div>
              <div className="col">
                <Icon icon='tabler:chevron-down' className='text-[--foreground-green] text-base' />
              </div>
            </div>
            <div className="flex justify-center overflow-hidden rounded-2xl relative">
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d63606.966379454316!2d7.103640400000001!3d4.866482649999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sng!4v1752212307109!5m2!1sen!2sng" width="1000" height="500" style={{border: '0'}}></iframe>
              <div className="rounded-3xl p-2 flex items-center justify-center bg-[#F8F9FE] absolute top-5 left-1/2 -translate-x-1/2 gap-3 md:w-[90%] w-[95%]">
                <Icon icon='tabler:search' className='text-xl' />
                <input type="search" className='flex-grow outline-none border-none bg-transparent' placeholder='Street Info' />
                <Icon icon='tabler:chevron-up' className='text-xl' />
              </div>
            </div>
          </section>
        )}
      </>
    ) : (
      <div className='flex flex-col gap-5'>
        <div onClick={() => setActiveAmount('uyo')} className={`flex cursor-pointer justify-between md:py-4 py-3 px-5 rounded-2xl items-center ${activeAmount === 'elite' ? 'bg-[#00683736]' : 'border'}`}>
            <div className="flex gap-3 items-center">
              <div className={`flex justify-center items-center rounded-full w-5 h-5 ${activeAmount === 'uyo' ? 'bg-[#006838]' : 'border'}`}>
                <div className={`rounded-full bg-full bg-white w-2 h-2 ${activeAmount === 'uyo' ? 'block' : 'hidden'}`}></div>
              </div>
              <div className="flex flex-col gap-2 ">
                <p className="font-extrabold">Uyo-Lagos</p>
                <p className="text-sm font-light text-[#006838]">Station</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <h3 className="font-bold md:text-xl">N 98.80</h3>
              <p className="text-sm font-light">/KM</p>
            </div>
          </div>
          <div onClick={() => setActiveAmount('portharcourt')} className={`flex cursor-pointer justify-between md:py-4 py-3 px-5 rounded-2xl items-center ${activeAmount === 'portharcourt' ? 'bg-[#00683736]' : 'border'}`}>
            <div className="flex gap-3 items-center">
              <div className={`flex justify-center items-center rounded-full w-5 h-5 ${activeAmount === 'portharcourt' ? 'bg-[#006838]' : 'border'}`}>
                <div className={`rounded-full bg-full bg-white w-2 h-2 ${activeAmount === 'portharcourt' ? 'block' : 'hidden'}`}></div>
              </div>
              <div className="flex flex-col gap-2 ">
                <p className="font-extrabold">Port Harcourt - Benin</p>
                <p className="text-sm font-light text-[#006838]">Station</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <h3 className="font-bold md:text-xl">N 10.90</h3>
              <p className="text-sm font-light">/KM</p>
            </div>
          </div>
          <div onClick={() => setActiveAmount('express')} className={`flex cursor-pointer justify-between md:py-4 py-3 px-5 rounded-2xl items-center ${activeAmount === 'express' ? 'bg-[#00683736]' : 'border'}`}>
            <div className="flex gap-3 items-center">
              <div className={`flex justify-center items-center rounded-full w-5 h-5 ${activeAmount === 'express' ? 'bg-[#006838]' : 'border'}`}>
                <div className={`rounded-full bg-full bg-white w-2 h-2 ${activeAmount === 'express' ? 'block' : 'hidden'}`}></div>
              </div>
              <div className="flex flex-col gap-2 ">
                <p className="font-extrabold">Express</p>
                <p className="text-sm font-light text-[#006838]">Door Delivery</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <h3 className="font-bold md:text-xl">N 1.90</h3>
              <p className="text-sm font-light">/KM</p>
            </div>
          </div>
          <div className="flex flex-col p-5 rounded-3xl gap-4 bg-[#00683736]">
            <h3 className="font-bold text-xl">You'll get:</h3>
            <div className="flex items-center gap-2">
              <FaStar className='text-[#ffd33c]' />
              <p className="text-sm">6-7 days delivery time</p>
            </div>
            <div className="flex items-center gap-2">
              <FaStar className='text-[#ffd33c]' />
              <p className="text-sm">Up to 20-ton instant pickup</p>
            </div>
            <div className="flex items-center gap-2">
              <FaStar className='text-[#ffd33c]' />
              <p className="text-sm">Up to 40-ton instant dropoff</p>
            </div>
          </div>
      </div>
    )}
  </div>
  )
}

const Routes: React.FC<RoutesProps> = ({activeTab, setActiveTab}) => {
  return (
    <div className={openSansFont}>
      <div className="row flex items-center justify-center border-b border-[#0C1F1F33]">
        {['pickup', 'dropoff'].map(text => (<button onClick={() => { setActiveTab(text) }} className={`flex-1 py-3 uppercase ${interFont} text-sm text-[#71727A] border-b-4 transition-all duration-300 ${activeTab == text ? 'border-[#006838] font-bold bg-[#EAF2FF]' : 'border-transparent'}`}>
          {text}
        </button>))}
      </div>
      {activeTab == 'pickup' && <Pickup />}
      {activeTab == 'dropoff' && <Dropoff />}
    </div>
  )
}

export default Routes