import { Link } from "react-router-dom"

import { AppTopBar } from "@/routes/AppShell"

// Placeholder data until a lists API exists — real lists will come from the backend.
const PLACEHOLDER_LISTS = [
  { id: "work", label: "업무" },
  { id: "personal", label: "개인" },
]

/** `/app/lists` — all lists overview; `/app/lists/:listId` is the canonical single-list view. */
function ListsScreen() {
  return (
    <div className="flex flex-col gap-3 pb-6">
      <AppTopBar title="목록" />
      <ul className="flex flex-col gap-2 px-5">
        {PLACEHOLDER_LISTS.map((list) => (
          <li key={list.id}>
            <Link
              to={`/app/lists/${list.id}`}
              className="block rounded-2xl border border-sand-200 bg-card px-4 py-3 text-sm font-medium shadow-(--shadow-sm)"
            >
              {list.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export { ListsScreen }
