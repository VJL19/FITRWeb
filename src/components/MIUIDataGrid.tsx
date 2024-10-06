import {
  DataGrid,
  GridColDef,
  GridLoadingOverlayVariant,
  GridToolbar,
} from "@mui/x-data-grid";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import { Stack } from "@mui/material";

type TDataGridProps = {
  rows: readonly any[] | undefined;
  columns: GridColDef<any>[];
  loading?: boolean | undefined;
  variant?: GridLoadingOverlayVariant | undefined;
  nowRowsVariant?: GridLoadingOverlayVariant | undefined;
};

const MIUIDataGrid = ({
  rows,
  columns,
  loading,
  variant,
  nowRowsVariant,
}: TDataGridProps) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      loading={loading}
      pageSizeOptions={[5, 10, 15, 20, 25]}
      disableRowSelectionOnClick
      slotProps={{
        loadingOverlay: {
          variant: variant,
          noRowsVariant: nowRowsVariant,
        },
        toolbar: {
          showQuickFilter: true,
        },
      }}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      slots={{
        toolbar: GridToolbar,
        noResultsOverlay: () => (
          <Stack
            height="100%"
            alignItems="center"
            justifyContent="center"
            flex={1}
            flexDirection={"row"}
            gap={1.5}
          >
            <PlaylistRemoveIcon fontSize="large" htmlColor="#202020" />
            No results found
          </Stack>
        ),
      }}
    />
  );
};

export default MIUIDataGrid;
