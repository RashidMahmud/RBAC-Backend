import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";

interface registerUserPayload {
  name: string;
  email: string;
  password: string;
  profilePhoto?: string;
}

const registerUserIntoDB = async (payload: registerUserPayload) => {
  const { name, email, password, profilePhoto } = payload;
  const isUserExist = await prisma.user.findUnique({
    where: { email },
  });

  if (isUserExist) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  await prisma.profile.create({
    data: {
      userId: createdUser.id,
      profilePhoto,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: createdUser.id,
      email: createdUser.email || email,
    },

    omit: {
      password: true,
    },

    include: {
      profile: true,
    },
  });
  return user;
};

export const userService = {
  registerUserIntoDB,
};
