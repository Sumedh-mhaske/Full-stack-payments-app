export function Balance({ balance }) {
  return (
    <div className="flex gap-2">
      <h5 className="font-semibold">Your balance : </h5>
      <h5>${balance}</h5>
    </div>
  );
}
