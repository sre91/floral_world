import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

<<<<<<< HEAD
// Verifies token validity for all logged-in users
export const verifyToken = (
  req: Request,
=======
export const verifyToken = (
  req: Request & { user?: any },
>>>>>>> 0d921a1d88b454731656b1f09ab6660d0f860d96
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

<<<<<<< HEAD
=======
  // Step 1: Check if token exists
>>>>>>> 0d921a1d88b454731656b1f09ab6660d0f860d96
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

<<<<<<< HEAD
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
      isAdmin?: boolean;
    };

    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Verifies admin access only
export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user;

  if (!user || !user.isAdmin) {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  next();
};
=======
  // Step 2: Extract the actual token (after 'Bearer ')
  const token = authHeader.split(" ")[1];

  try {
    // Step 3: Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    // Step 4: Store user data in the request (for later use)
    req.user = decoded;

    // Step 5: Allow request to continue to next function
    next();
  } catch (err) {
    // If token invalid or expired
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
>>>>>>> 0d921a1d88b454731656b1f09ab6660d0f860d96
