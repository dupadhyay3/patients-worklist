import classNames from 'classnames'
import { FC } from 'react'
import s from './Popup.module.scss'
import cn from 'classnames'

interface IPopup {
  head: string
  children?: string
  cancelText: any
  continueText: any
  onPopupClose: boolean
  setOnPopupClose: any
  addressMessage: any
  addressError: any
  deletePopupClass: any
}

const Popup: FC<IPopup> = ({
  head,
  children,
  cancelText,
  continueText,
  onPopupClose,
  setOnPopupClose,
  addressMessage,
  addressError,
  deletePopupClass,
}) => {
  return (
    <>
      <div
        id='authentication-modal'
        aria-hidden='true'
        className={cn(
          s.popupContainer,
          !onPopupClose && 'hidden',
          'overflow-y-auto overflow-x-hidden text-left fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full'
        )}
      >
        <div className={cn(s.popupContnt, 'relative p-4 w-1/2	 h-full md:h-auto')}>
          <div
            className={cn(
              s.popupArea,
              'relative bg-white rounded-lg shadow dark:bg-gray-700'
            )}
          >
            <button
              type='button'
              className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white'
              data-modal-toggle='authentication-modal'
              onClick={() => setOnPopupClose(false)}
            >
              <svg
                className='w-5 h-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </button>
            <div className='py-6 px-6 lg:px-8'>
              <h3 className='mb-4 text-xl font-medium text-gray-900 dark:text-white'>
                {head}
              </h3>
              <form className='space-y-6' action='#'>
                <div className='w-full'>
                  <label
                    htmlFor='firstName'
                    className='px-1 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                  >
                    Full Name
                  </label>
                  <div className='flex'>
                    <div className='w-1/3 column px-1'>
                      <input
                        type='text'
                        name='firstName'
                        id='firstName'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                        placeholder='Enter First Name'
                        required
                      />
                    </div>
                    <div className='w-1/3 column px-1'>
                      <input
                        type='text'
                        name='middleName'
                        id='middleName'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                        placeholder='Enter Middle Name'
                        required
                      />
                    </div>
                    <div className='w-1/3 column px-1'>
                      <input
                        type='text'
                        name='lastName'
                        id='lastName'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                        placeholder='Enter Last Name'
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className='w-full'>
                  <div className='flex'>
                    <div className='w-1/3 column px-1'>
                      <label
                        htmlFor='age'
                        className='px-1 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                      >
                        Age
                      </label>
                      <input
                        type='text'
                        name='age'
                        id='age'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                        placeholder='Enter Age'
                        required
                      />
                    </div>
                    <div className='w-1/3 column px-1'>
                      <label
                        htmlFor='gender'
                        className='px-1 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                      >
                        Gender
                      </label>
                      <input
                        type='text'
                        name='gender'
                        id='gender'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                        placeholder='Enter Gender'
                        required
                      />
                    </div>
                    <div className='w-1/3 column px-1'>
                      <label
                        htmlFor='phoneNumber'
                        className='px-1 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                      >
                        Phone Number
                      </label>
                      <input
                        type='text'
                        name='phoneNumber'
                        id='phoneNumber'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                        placeholder='Enter Phone Number'
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className='w-full'>
                  <div className='flex'>
                    <div className='w-1/2 column px-1'>
                      <label
                        htmlFor='vaccineName'
                        className='px-1 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                      >
                        Vaccine Name
                      </label>
                      <input
                        type='text'
                        name='vaccineName'
                        id='vaccineName'
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                        placeholder='Enter Vaccine Name'
                        required
                      />
                    </div>
                    <div className='w-1/2 column px-1'>
                      <label
                        htmlFor='vaccinationStatus'
                        className='px-1 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                      >
                        Vaccination Status
                      </label>
                      <select
                        name='vaccinationStatus'
                        className='bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      >
                        <option selected>Choose a country</option>
                        <option value='Fully vaccinated'>Fully vaccinated</option>
                        <option value='Partially vaccinated'>
                          Partially vaccinated
                        </option>
                        <option value='Not vaccinated'>Not vaccinated</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className='w-full px-1'>
                  <button
                    type='submit'
                    className='w-full text-white bg-gradient-to-r from-purple-500 via-blue-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
                  >
                    ADD DATA
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Popup
