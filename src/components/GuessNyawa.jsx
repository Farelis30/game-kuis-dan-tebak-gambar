import { FaHeart } from "react-icons/fa";

const Nyawa = ({ jumlahNyawa }) => (
  <div className="flex gap-2">
    {Array.from({ length: jumlahNyawa }, (_, index) => (
      <p key={index}>
        <FaHeart className="text-red-500" size={30} />
      </p>
    ))}
  </div>
);

export default Nyawa;
