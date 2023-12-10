'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '@/hooks/useRegisterModal';
import useLoginModal from '@/hooks/useLoginModal';
import { User } from '@prisma/client';
import { SafeUser } from '@/types';
import { signOut } from 'next-auth/react';
import useRentModal from '@/hooks/useRentModal';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}
const UserMenu = ({ currentUser }: UserMenuProps) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);
  return (
    <div className="relative">
      <div className="flex items-center flex-row gap-3">
        <div
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-200
            transition
            cursor-pointer
            "
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="
            flex 
            flex-row
            md:py-1
            md:px-2
            border-[1px]
            border-neutral-200
            gap-3
            px-4
            rounded-full
            hover:shadow-md
            cursor-pointer
            transition
            items-center
            "
        >
          <AiOutlineMenu size={18} />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw]  md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push('/trips')}
                  label="my trips"
                />
                <MenuItem
                  onClick={() => router.push('/favorites')}
                  label="my favorites"
                />
                <MenuItem
                  onClick={() => router.push('/reservations')}
                  label="my reservations"
                />
                <MenuItem
                  onClick={() => router.push('/properties')}
                  label="my properties"
                />
                <MenuItem onClick={rentModal.onOpen} label="my home" />
                <hr />
                <MenuItem onClick={() => signOut()} label="logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
